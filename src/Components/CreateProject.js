import React, { useState, useContext, useEffect } from 'react';

import Dropdown from 'react-dropdown';
import { Modal, Button, Alert } from 'react-bootstrap';

import http from '../utils/http';
import { AppContext } from '../Context/AppContext';

import 'react-dropdown/style.css';

function CreateProjectModal(props) {
  const [name, setName] = useState('');
  const [projectManager, setProjectManager] = useState(props.pms[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const globalState = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await http.post('/project', {
        headers: {
          authorization: `Bearer ${globalState.state.accessToken}`,
        },
        body: {
          name,
          description,
          projectManager: projectManager.value,
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
          Create New Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="Title">Title</label> <br />
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
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
            <label htmlFor="Role">Project Manager</label> <br />
            <Dropdown
              options={props.pms}
              onChange={(option) => {
                setProjectManager(option);
              }}
              value={projectManager}
              placeholder="Select Project Manager"
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

function CreateProject() {
  const [modalShow, setModalShow] = useState(false);
  const [allProjectManagers, setAllProjectManagers] = useState([]);
  const globalState = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await http.get('/user', {
          headers: {
            authorization: `Bearer ${globalState.state.accessToken}`,
          },
        });

        const pms = data.payload.filter((user) => user.role_id === 3);
        const options = pms.map((pm) => ({ value: pm.id, label: pm.name }));

        setAllProjectManagers(options);
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, [globalState.state.accessToken]);

  return (
    <>
      <Button
        style={{ marginLeft: 10 }}
        size="sm"
        variant="dark"
        onClick={() => setModalShow(true)}
      >
        Create Project
      </Button>

      <CreateProjectModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        pms={allProjectManagers}
      />
    </>
  );
}

export default CreateProject;
