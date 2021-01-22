import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';

type Props = {
  label: string;
  onClick(): void;
};

const ButtonStyle = styled.div`
  position: fixed;
  right: 25px;
  bottom: 25px;
`;

const ButtonNew: React.FC<Props> = ({ label, onClick }) => {
  return (
    <ButtonStyle>
      <Button className='button' color='success' onClick={onClick}>
        <FontAwesomeIcon className='button' icon={faPlus} size='xs' />
        {label}
      </Button>
    </ButtonStyle>
  );
};

export default ButtonNew;
