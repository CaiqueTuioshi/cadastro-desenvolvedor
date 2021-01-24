import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

type Props = {};

const NavbarComponent: React.FC<Props> = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Container className='home themed-container'>
      <Navbar color='light' light>
        <NavbarBrand href='/' className='mr-auto'>
          Gazin
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className='mr-2' />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href='/developers/novo'>Adicionar Desenvolvedor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/developers'>Listar Desenvolvedores</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default NavbarComponent;
