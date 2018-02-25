import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';

export default class Header extends Component {
  render() {
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Finding Falcone</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          
          <Nav pullRight>
            <NavItem target="_blank" href="https://www.geektrust.in/">
              GeekTrust Home
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}