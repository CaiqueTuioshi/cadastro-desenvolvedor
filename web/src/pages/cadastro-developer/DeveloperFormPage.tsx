import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import * as Yup from 'yup';
import { DevelopersService } from '../../services';
import { Developer } from '../../types/Developer';

type Props = {};

const initialValue: Developer = {
  nome: '',
  sexo: '',
  idade: '',
  hobby: '',
  dataNascimento: '',
};

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  sexo: Yup.string().required('Sexo é obrigatório'),
  idade: Yup.string().required('Idade é obrigatória'),
  hobby: Yup.string().required('Hobby é obrigatório'),
  dataNascimento: Yup.string().required('Data de Nascimento é obrigatória'),
});

const DeveloperFormPage: React.FC<Props> = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [developer, setDeveloper] = useState<Developer>(initialValue);
  const isNew = id === 'novo';

  useEffect(() => {
    if (!isNew) {
      DevelopersService.findById(id)
        .then((response) => {
          setDeveloper(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.errorMessage);
        });
    }
  }, [isNew, id]);

  const onSubmit = (value: Developer) => {
    DevelopersService.save(value)
      .then(() => history.push('/developers'))
      .catch((error) => {
        toast.error(error.response.data.errorMessage);
      });
  };

  const onCancel = () => {
    history.push('/developers');
  };

  return (
    <Container className='themed-container'>
      <Formik
        initialValues={developer}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formProps: FormikProps<Developer>) => (
          <React.Fragment>
            <ToastContainer />
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for='nome'>Nome</Label>
                  <Input
                    type='text'
                    name='nome'
                    id='nome'
                    onChange={(value) => {
                      formProps.setFieldValue('nome', value.target.value);
                      formProps.setFieldTouched('nome', true);
                    }}
                    value={formProps.values.nome}
                  />
                  {formProps.touched.nome && formProps.errors.nome ? (
                    <div className='error'>{formProps.errors.nome}</div>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for='sexo'>Sexo</Label>
                  <Input
                    type='select'
                    name='sexo'
                    id='sexo'
                    onChange={(value) => {
                      formProps.setFieldValue('sexo', value.target.value);
                      formProps.setFieldTouched('sexo', true);
                    }}
                    value={formProps.values.sexo}
                  >
                    <option value=''>Selecione</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Feminino</option>
                    <option value='O'>Outro</option>
                  </Input>
                  {formProps.touched.sexo && formProps.errors.sexo ? (
                    <div className='error'>{formProps.errors.sexo}</div>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={1}>
                <FormGroup>
                  <Label for='idade'>Idade</Label>
                  <Input
                    type='text'
                    name='idade'
                    id='idade'
                    onChange={(value) => {
                      formProps.setFieldValue('idade', value.target.value);
                      formProps.setFieldTouched('idade', true);
                    }}
                    value={formProps.values.idade}
                  />
                  {formProps.touched.idade && formProps.errors.idade ? (
                    <div className='error'>{formProps.errors.idade}</div>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for='dataNascimento'>Data de Nascimento</Label>
                  <Input
                    type='date'
                    name='dataNascimento'
                    id='dataNascimento'
                    onChange={(value) => {
                      formProps.setFieldValue(
                        'dataNascimento',
                        value.target.value
                      );
                      formProps.setFieldTouched('dataNascimento', true);
                    }}
                    value={formProps.values.dataNascimento}
                  />
                  {formProps.touched.dataNascimento &&
                  formProps.errors.dataNascimento ? (
                    <div className='error'>
                      {formProps.errors.dataNascimento}
                    </div>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for='hobby'>Hobby</Label>
                  <Input
                    type='textarea'
                    name='hobby'
                    id='hobby'
                    onChange={(value) => {
                      formProps.setFieldValue('hobby', value.target.value);
                      formProps.setFieldTouched('hobby', true);
                    }}
                    value={formProps.values.hobby}
                  />
                  {formProps.touched.hobby && formProps.errors.hobby ? (
                    <div className='error'>{formProps.errors.hobby}</div>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <div>
              <Button
                className='button'
                color='primary'
                onClick={formProps.submitForm}
              >
                Salvar
              </Button>
              <Button className='button' color='danger' onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </React.Fragment>
        )}
      </Formik>
    </Container>
  );
};

export default DeveloperFormPage;
