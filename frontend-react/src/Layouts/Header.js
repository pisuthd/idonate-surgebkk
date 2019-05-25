import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import styled from 'styled-components' 

const LinkItem = styled(Link)`
    padding: 2px;
    margin-right: 2px;
`;

const StyledHeader = styled.div`
    position: fixed;
    width: 100%;
    z-index:9999;

`;

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <StyledHeader>
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/"><b>IDONATE</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/">Explore</Link></NavLink>
                </NavItem>
              <NavItem>
              <NavLink><Link to="/new">Start a project</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/settings">Settings</Link></NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </StyledHeader>
    );
  }
}