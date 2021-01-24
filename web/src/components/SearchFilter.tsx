import React, { useState } from 'react';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';

type Props = {
  search(page?: number, searchFilter?: string): void;
};

const SearchFilter: React.FC<Props> = ({ search }) => {
  const [field, setField] = useState<string>('');
  const [filtro, setFiltro] = useState<string>('');

  const onFieldChange = (value: string) => {
    setFiltro('');
    setField(value);
  };

  const searchBuilder = () => {
    if (field) {
      const searchFilter = field + '=' + filtro;

      search(undefined, searchFilter);
    }
  };

  const getTypeFilterField = () => {
    if (field === 'idade') {
      return 'number';
    }

    if (field === 'dataNascimento') {
      return 'date';
    }

    return 'text';
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={3}>
          <FormGroup>
            <Input
              type='select'
              name='typeFilter'
              id='typeFilter'
              onChange={(value) => onFieldChange(value.target.value)}
              value={field}
            >
              <option value=''>Selecionar</option>
              <option value='todos'>Todos</option>
              <option value='nome'>Nome</option>
              <option value='sexo'>Sexo</option>
              <option value='idade'>Idade</option>
              <option value='dataNascimento'>Data de Nascimento</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          {field === 'sexo' ? (
            <FormGroup>
              <Input
                type='select'
                name='sexo'
                id='sexo'
                onChange={(value) => setFiltro(value.target.value)}
                value={filtro}
              >
                <option value=''>Selecione</option>
                <option value='M'>Masculino</option>
                <option value='F'>Feminino</option>
                <option value='O'>Outro</option>
              </Input>
            </FormGroup>
          ) : (
            <FormGroup>
              <Input
                type={getTypeFilterField()}
                onChange={(value) => setFiltro(value.target.value)}
                value={filtro}
                disabled={field === 'todos'}
              />
            </FormGroup>
          )}
        </Col>
        <Col md={1}>
          <FormGroup>
            <Button className='button' color='primary' onClick={searchBuilder}>
              Filtrar
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SearchFilter;
