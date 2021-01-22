import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import { FormattedDate } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Table, Button, ButtonGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import ButtonNew from '../../components/ButtonNew';
import PaginationTable from '../../components/PaginationTable';
import SearchFilter from '../../components/SearchFilter';
import { DeveloperService } from '../../services';
import { Developer, SexoDescricao } from '../../types/Developer';

type Props = {};

const DeveloperListPage: React.FC<Props> = () => {
  const history = useHistory();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const findAllPagedSearch = useCallback(
    (page: number = 1, searchFilter: string = '') => {
      DeveloperService.findAllPagedSearch(page, searchFilter)
        .then((response) => {
          setDevelopers(response.data.content);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          toast.error(error.response.data.errorMessage);
        });
    },
    []
  );

  const onEdit = (id: string) => {
    history.push(`/developers/${id}`);
  };

  const onRemove = (id: string) => {
    Swal.fire({
      title: 'Deseja remover este desenvolvedor?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        DeveloperService.remove(id)
          .then(async () => {
            await findAllPagedSearch();
            Swal.fire('Desenvolvedor removido!', '', 'success');
          })
          .catch((error) => {
            toast.error(error.response.data.errorMessage);
          });
      }
    });
  };

  const onNewDeveloper = () => {
    history.push('/developers/novo');
  };

  return (
    <Container className='themed-container'>
      <ToastContainer />
      <SearchFilter search={findAllPagedSearch} />
      <Table hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((developer) => {
            return (
              <tr key={developer._id}>
                <td>{developer.nome}</td>
                <td>{SexoDescricao[developer.sexo]}</td>
                <td>{developer.idade}</td>
                <td>
                  {
                    <FormattedDate
                      value={developer.dataNascimento}
                      timeZone='UTC'
                    />
                  }
                </td>
                <td>
                  <ButtonGroup>
                    <Button
                      className='button'
                      color='success'
                      onClick={() => onEdit(developer._id!)}
                    >
                      <FontAwesomeIcon
                        className='button'
                        icon={faPencilAlt}
                        size='xs'
                      />
                      Editar
                    </Button>
                    <Button
                      color='danger'
                      onClick={() => onRemove(developer._id!)}
                    >
                      <FontAwesomeIcon
                        className='button'
                        icon={faTrashAlt}
                        size='xs'
                      />
                      Remover
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PaginationTable
        currentPage={currentPage}
        totalPages={totalPages}
        search={findAllPagedSearch}
      />

      <ButtonNew label='Novo Desenvolvedor' onClick={onNewDeveloper} />
    </Container>
  );
};

export default DeveloperListPage;
