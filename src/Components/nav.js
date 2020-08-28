import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Container, Button } from 'react-bootstrap';

import { AppContext } from '../Context/AppContext';

function Nav() {
  const globalState = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('data');
    globalState.dispatch({ type: 'LOGOUT' });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container justify-content-between>
        <Navbar.Brand>
          <Link to="/home">Project Management System</Link>
        </Navbar.Brand>

        {globalState.state.isLoggedIn && (
          <Button onClick={logout} variant="dark">
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Nav;
