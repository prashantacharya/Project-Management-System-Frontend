import React, { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';

import http from '../../utils/http';
import { AppContext } from '../../Context/AppContext';

import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const globalState = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 5) {
      setUsernameError('Username cannot be shorter than 5 characters');

      return;
    } else {
      setUsernameError('');
    }

    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password
      )
    ) {
      setPasswordError(
        'Password must be 8 characters long and should include at least of the uppercase letter, lowercase letter, number and special character'
      );

      return;
    } else {
      setPasswordError('');
    }

    try {
      if (!usernameError && !passwordError) {
        const data = await http.post('/auth/login', {
          body: {
            username,
            password,
          },
        });

        globalState.dispatch({
          type: 'LOGIN',
          payload: {
            accessToken: data.accessToken,
            userInfo: data.payload,
          },
        });

        if (data.status === 'Success') {
          setUsername('');
          setPassword('');
          history.push('/home');
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Could not connect to the internet');
      } else {
        setError('Could not log in');
      }

      setUsername('');
      setPassword('');
    }
  };

  useEffect(() => {
    if (globalState.state.isLoggedIn) {
      history.push('/home');
    }
  }, [globalState, history]);

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <div className="login__card">
        <h3>Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="Username">Username</label> <br />
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            {usernameError && <Alert variant="danger">{usernameError}</Alert>}
          </div>

          <div className="form-element">
            <label htmlFor="Password">Password</label> <br />
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
          </div>

          <div className="form-element">
            <Button variant="dark" onClick={handleSubmit} type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
