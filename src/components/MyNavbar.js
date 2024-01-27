import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand className='text-light font-weight-bold' as={Link} to="/">IMDBK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='text-light' as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link className='text-light' as={Link} to="/favorites">Favorites</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link className='text-light' as={Link} to="/login">Login</Nav.Link>
            <Nav.Link className='text-light' as={Link} to="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
