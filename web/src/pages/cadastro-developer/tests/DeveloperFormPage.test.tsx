import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { DeveloperService } from '../../../services';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import DeveloperFormPage from '../DeveloperFormPage';

jest.mock('../../../services');

const developerService = DeveloperService as jest.Mocked<
  typeof DeveloperService
>;

describe('<DeveloperList />', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });

  test('deve apresentar validação no formulário ao salvar um novo cadastro com os campos obrigatórios vazios', async () => {
    const route = '/developers/novo';
    const memoryHistory = createMemoryHistory({ initialEntries: [route] });

    const { findByText, getByText } = render(
      <Router history={memoryHistory}>
        <Route path={'/developers/:id'}>
          <DeveloperFormPage />
        </Route>
      </Router>
    );

    expect(memoryHistory.location.pathname).toBe('/developers/novo');

    userEvent.click(getByText('Salvar'));

    expect(await findByText('Nome é obrigatório'));
    expect(getByText('Sexo é obrigatório'));
    expect(getByText('Idade é obrigatória'));
    expect(getByText('Hobby é obrigatório'));
    expect(getByText('Data de Nascimento é obrigatória'));
  });

  test('deve salvar o novo desenvolvedor corretamente e redirecionar para a rota de listagem', async () => {
    const route = '/developers/novo';
    const memoryHistory = createMemoryHistory({ initialEntries: [route] });

    developerService.save.mockResolvedValue({} as any);

    const { getByText, getByLabelText } = render(
      <Router history={memoryHistory}>
        <Route path={'/developers/:id'}>
          <DeveloperFormPage />
        </Route>
      </Router>
    );

    await waitFor(() => {
      fireEvent.change(getByLabelText('Nome'), {
        target: { value: 'Caíque Lima' },
      });
      fireEvent.change(getByLabelText('Sexo'), {
        target: { value: 'M' },
      });
      fireEvent.change(getByLabelText('Idade'), {
        target: { value: '25' },
      });
      fireEvent.change(getByLabelText('Data de Nascimento'), {
        target: { value: '1995-04-28' },
      });
      fireEvent.change(getByLabelText('Hobby'), {
        target: { value: 'Ciclismo' },
      });
    });

    userEvent.click(getByText('Salvar'));

    await waitFor(() => {
      expect(developerService.save).toBeCalledTimes(1);
      expect(developerService.save).toBeCalledWith({
        nome: 'Caíque Lima',
        sexo: 'M',
        idade: '25',
        dataNascimento: '1995-04-28',
        hobby: 'Ciclismo',
      });
    });

    expect(memoryHistory.location.pathname).toBe('/developers');
  });

  test('deve dar erro ao salvar um novo desenvolvedor', async () => {
    const route = '/developers/novo';
    const memoryHistory = createMemoryHistory({ initialEntries: [route] });

    developerService.save.mockRejectedValue({
      response: { data: { errorMessage: 'Erro ao salvar desenvolvedor.' } },
    });

    const { getByText, getByLabelText } = render(
      <Router history={memoryHistory}>
        <Route path={'/developers/:id'}>
          <DeveloperFormPage />
        </Route>
      </Router>
    );

    await waitFor(() => {
      fireEvent.change(getByLabelText('Nome'), {
        target: { value: 'Caíque Lima' },
      });
      fireEvent.change(getByLabelText('Sexo'), {
        target: { value: 'M' },
      });
      fireEvent.change(getByLabelText('Idade'), {
        target: { value: '25' },
      });
      fireEvent.change(getByLabelText('Data de Nascimento'), {
        target: { value: '1995-04-28' },
      });
      fireEvent.change(getByLabelText('Hobby'), {
        target: { value: 'Ciclismo' },
      });
    });

    userEvent.click(getByText('Salvar'));

    await waitFor(() => {
      expect(developerService.save).toBeCalledTimes(1);
      expect(getByText('Erro ao salvar desenvolvedor.')).toBeInTheDocument();
    });

    expect(memoryHistory.location.pathname).not.toBe('/developers');
  });

  test('deve redirecionar para a rota de listagem ao clicar no botão Cancelar', async () => {
    const route = '/developers/novo';
    const memoryHistory = createMemoryHistory({ initialEntries: [route] });

    const { getByText } = render(
      <Router history={memoryHistory}>
        <Route path={'/developers/:id'}>
          <DeveloperFormPage />
        </Route>
      </Router>
    );

    userEvent.click(getByText('Cancelar'));

    expect(memoryHistory.location.pathname).toBe('/developers');
  });

  test('deve carregar o formulário carregado em modo de edição do desenvolvedor com o id 10', async () => {
    const route = '/developers/10';
    const memoryHistory = createMemoryHistory({ initialEntries: [route] });

    developerService.findById.mockResolvedValue({
      data: {
        _id: '10',
        nome: 'Caíque Lima',
        sexo: 'M',
        idade: 25,
        dataNascimento: '1995-04-28',
        hobby: 'Ciclismo',
      },
    } as any);

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <Route path={'/developers/:id'}>
          <DeveloperFormPage />
        </Route>
      </Router>
    );

    expect(memoryHistory.location.pathname).toBe('/developers/10');

    await waitFor(() => {
      expect(developerService.findById).toBeCalledTimes(1);
    });

    expect(getByLabelText('Nome')).toHaveValue('Caíque Lima');
    expect(getByLabelText('Sexo')).toHaveValue('M');
    expect(getByLabelText('Idade')).toHaveValue(25);
    expect(getByLabelText('Data de Nascimento')).toHaveValue('1995-04-28');
    expect(getByLabelText('Hobby')).toHaveValue('Ciclismo');
  });

  test('deve dar erro ao carregar o modo de edição do desenvolvedor com o id 10', async () => {
    const route = '/developers/10';
    const memoryHistory = createMemoryHistory({ initialEntries: [route] });

    developerService.findById.mockRejectedValue({
      response: { data: { errorMessage: 'Erro ao buscar desenvolvedor.' } },
    });

    const { getByText } = render(
      <Router history={memoryHistory}>
        <Route path={'/developers/:id'}>
          <DeveloperFormPage />
        </Route>
      </Router>
    );

    expect(memoryHistory.location.pathname).toBe('/developers/10');

    await waitFor(() => {
      expect(developerService.findById).toBeCalledTimes(1);
      expect(getByText('Erro ao buscar desenvolvedor.')).toBeInTheDocument();
    });
  });
});
