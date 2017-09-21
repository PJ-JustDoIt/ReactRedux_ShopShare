

"use strict"

import React from 'react';
import {Nav,NavItem,Navbar,Badge} from 'react-bootstrap';  

class Menu extends React.Component{

  render(){
    return(

  <Navbar inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">ShopShare App</a>
      </Navbar.Brand>
      <Navbar.Toggle />                                  
    </Navbar.Header>
    <Navbar.Collapse>          
      <Nav pullRight>
        <NavItem eventKey={1} href="/admin">Manage Shopping List</NavItem>
        <NavItem eventKey={2} href="/cart">My Cart </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

      );
  }

}

export default Menu;