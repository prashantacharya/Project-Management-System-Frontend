import React, { useState, useContext } from 'react';

import Dropdown from 'react-dropdown';
import { Modal, Button, Alert } from 'react-bootstrap';

import http from '../utils/http';
import { AppContext } from '../Context/AppContext';

import 'react-dropdown/style.css';

function CreateUserModal(props) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Engineer');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const globalState = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await http.post('/user', {
        headers: {
          authorization: `Bearer ${globalState.state.accessToken}`,
        },
        body: {
          name,
          username,
          password,
          userRole: role,
        },
      });

      if (data.status === 'Success') {
        setUsername('');
        setPassword('');
        setName('');
        setRole('Engineer');
        setError('');

        setStatus('User Successfully Created');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Could not connect to the internet');
      } else {
        setError('Could not create user');
      }

      setUsername('');
      setPassword('');
      setName('');
      setRole('Engineer');
      setStatus('');
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="Name">Name</label> <br />
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="form-element">
            <label htmlFor="Username">Username</label> <br />
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
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
          </div>

          <div className="form-element">
            <label htmlFor="Role">Role</label> <br />
            <Dropdown
              options={['Engineer', 'Project Manager', 'Team Lead']}
              onChange={(option) => {
                setRole(option.value);
              }}
              value={role}
            />
          </div>

          <div className="form-element" style={{ marginTop: 20 }}>
            <Button
              style={{ width: '100%' }}
              variant="dark"
              onClick={handleSubmit}
              type="submit"
            >
              Create User
            </Button>
          </div>

          <div style={{ marginTop: 20 }}>
            {error && (
              <Alert size="sm" variant="danger">
                {error}
              </Alert>
            )}
            {status && (
              <Alert size="sm" variant="success">
                {status}
              </Alert>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="md"
          style={{ width: '100%' }}
          variant="danger"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function CreateUser() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button size="sm" variant="dark" onClick={() => setModalShow(true)}>
        Create User
      </Button>

      <CreateUserModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default CreateUser;
