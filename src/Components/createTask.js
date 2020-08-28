import React, { useState, useContext, useEffect } from 'react';

import Dropdown from 'react-dropdown';
import { Modal, Button, Alert } from 'react-bootstrap';

import http from '../utils/http';
import { AppContext } from '../Context/AppContext';

import 'react-dropdown/style.css';

function CreateProjectModal(props) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState(props.users[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const globalState = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await http.post(`/task/create/project/${props.projectid}`, {
        headers: {
          authorization: `Bearer ${globalState.state.accessToken}`,
        },
        body: {
          title,
          description,
          assignedTo: assignedTo.value,
          deadline: '2020-12-30',
        },
      });

      console.log(data);

      if (data.status === 'Success') {
        setStatus('Project Successfully Created');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Could not connect to the internet');
      } else {
        setError('Could not create user');
      }

      console.log(error);
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
          Create New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="Title">Title</label> <br />
            <input
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div className="form-element">
            <label htmlFor="Description">Description</label> <br />
            <textarea
              className="create-project-textarea"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <div className="form-element">
            <label htmlFor="Role">Assigned User</label> <br />
            <Dropdown
              options={props.users}
              onChange={(option) => {
                setAssignedTo(option);
              }}
              value={assignedTo}
              placeholder="Select Assgined User"
            />
          </div>

          <div className="form-element" style={{ marginTop: 20 }}>
            <Button
              style={{ width: '100%' }}
              variant="dark"
              onClick={handleSubmit}
              type="submit"
            >
              Create Project
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

function CreateTask({ projectId }) {
  const [modalShow, setModalShow] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const globalState = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await http.get(`/project/${projectId}/users`, {
          headers: {
            authorization: `Bearer ${globalState.state.accessToken}`,
          },
        });

        const options = data.payload.map((user) => ({
          value: user.id,
          label: user.name,
        }));

        setAllUsers(options);
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, [globalState.state.accessToken, projectId]);

  return (
    <>
      <Button
        style={{ marginLeft: 10 }}
        size="sm"
        variant="dark"
        onClick={() => setModalShow(true)}
      >
        Create Task
      </Button>

      <CreateProjectModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        users={allUsers}
        projectid={projectId}
      />
    </>
  );
}

export default CreateTask;
