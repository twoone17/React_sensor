import React from "react";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "./Navs.module.css"

function Navs() {
    return (
      <Navbar className={styles.sticky} bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SensorApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/analysis">Analysis</Nav.Link>  
            <Nav.Link href="/analysis">Setting</Nav.Link>          
          </Nav>
        </Container>
      </Navbar>
    );

};

export default Navs;