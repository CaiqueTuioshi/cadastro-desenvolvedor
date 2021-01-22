import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, within } from '@testing-library/react';
import { DeveloperService } from '../../../services';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DeveloperListPage from '../DeveloperListPage';
import { IntlProvider } from 'react-intl';
import userEvent from '@testing-library/user-event';

jest.mock('../../../services');

const developerService = DeveloperService as jest.Mocked<
  typeof DeveloperService
>;

const pagedDevelopers: any = {
  data: {
    content: [
      {
        _id: '10',
        nome: 'Caíque Lima',
        sexo: 'M',
        idade: 25,
        hobby: 'ciclismo',
        dataNascimento: '1995-04-28',
      },
    ],
  },
};

describe('<DeveloperList />', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });

  test('deve renderizar a lista de desenvolvedores com um registro', async () => {
    developerService.findAllPagedSearch.mockResolvedValue(pagedDevelopers);

    const { container } = render(
      <IntlProvider locale='pt'>
        <DeveloperListPage />
      </IntlProvider>
    );

    await waitFor(() => {
      expect(developerService.findAllPagedSearch).toBeCalledTimes(1);
      expect(developerService.findAllPagedSearch).toBeCalledWith(1, '');
    });

    const tableTitles = container.querySelector('thead');
    const tableTitlesWrapper = within(tableTitles as HTMLElement);

    expect(tableTitlesWrapper.queryByText('Nome')).toBeInTheDocument();
    expect(tableTitlesWrapper.queryByText('Sexo')).toBeInTheDocument();
    expect(tableTitlesWrapper.queryByText('Idade')).toBeInTheDocument();
    expect(
      tableTitlesWrapper.queryByText('Data de Nascimento')
    ).toBeInTheDocument();
    expect(tableTitlesWrapper.queryByText('Ações')).toBeInTheDocument();

    const tableRegisters = container.querySelectorAll('tbody > tr');
    expect(tableRegisters).toHaveLength(1);

    const rowWrapper = within(tableRegisters[0] as HTMLElement);

    expect(rowWrapper.queryByText('Caíque Lima')).toBeInTheDocument();
    expect(rowWrapper.queryByText('Masculino')).toBeInTheDocument();
    expect(rowWrapper.queryByText('25')).toBeInTheDocument();
    expect(rowWrapper.queryByText('28/04/1995')).toBeInTheDocument();
    expect(rowWrapper.queryByText('Editar')).toBeInTheDocument();
    expect(rowWrapper.queryByText('Remover')).toBeInTheDocument();
  });

  test('deve chamar a rota de edição ao clicar no botão Editar', async () => {
    const memoryHistory = createMemoryHistory();

    developerService.findAllPagedSearch.mockResolvedValue(pagedDevelopers);

    const { container } = render(
      <IntlProvider locale='pt'>
        <Router history={memoryHistory}>
          <DeveloperListPage />
        </Router>
      </IntlProvider>
    );

    await waitFor(() => {
      expect(developerService.findAllPagedSearch).toBeCalledTimes(1);
      expect(developerService.findAllPagedSearch).toBeCalledWith(1, '');
    });

    const tableRegisters = container.querySelectorAll('tbody > tr');
    expect(tableRegisters).toHaveLength(1);

    const rowWrapper = within(tableRegisters[0] as HTMLElement);

    userEvent.click(rowWrapper.getByText('Editar'));

    expect(memoryHistory.location.pathname).toBe('/developers/10');
  });

  test('deve chamar a rota do formulário de cadastro ao clicar no botão Novo Desenvolvedor', async () => {
    const memoryHistory = createMemoryHistory();

    developerService.findAllPagedSearch.mockResolvedValue(pagedDevelopers);

    const { getByText } = render(
      <IntlProvider locale='pt'>
        <Router history={memoryHistory}>
          <DeveloperListPage />
        </Router>
      </IntlProvider>
    );

    await waitFor(() => {
      expect(developerService.findAllPagedSearch).toBeCalledTimes(1);
      expect(developerService.findAllPagedSearch).toBeCalledWith(1, '');
    });

    userEvent.click(getByText('Novo Desenvolvedor'));

    expect(memoryHistory.location.pathname).toBe('/developers/novo');
  });

  test('deve dar erro ao carregar a lista de desenvolvedores', async () => {
    developerService.findAllPagedSearch.mockRejectedValue({
      response: { data: { errorMessage: 'Erro ao buscar desenvolvedores.' } },
    });

    const { getByText } = render(
      <IntlProvider locale='pt'>
        <DeveloperListPage />
      </IntlProvider>
    );

    await waitFor(() => {
      expect(developerService.findAllPagedSearch).toBeCalledTimes(1);
      expect(developerService.findAllPagedSearch).toBeCalledWith(1, '');
      expect(getByText('Erro ao buscar desenvolvedores.')).toBeInTheDocument();
    });
  });
});
