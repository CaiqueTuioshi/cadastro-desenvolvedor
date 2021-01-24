import React from 'react';
import {
  Container
} from 'reactstrap';
import styled from 'styled-components';

const HomePageStyle = styled.div`
  marginTop: 15px;
  padding: 10px;
`;

type Props = {}

const HomePage: React.FC<Props> = () => {
  return (
    <Container className='themed-container'>
      <HomePageStyle>
        <h3>Bem vindo!</h3>
        <p>Para iniciar o cadastro de desenvolvedor, utilize o menu acima, clicando em <i>Adicionar Desenvolvedor</i>.</p>
      </HomePageStyle>
    </Container>
  ) 
}

export default HomePage;
