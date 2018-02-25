import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return (
      <Navbar fixedBottom collapseOnSelect>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              @copyRights reserved scsiva1991
            </NavItem>
          </Nav>
      </Navbar>
    )
  }
}