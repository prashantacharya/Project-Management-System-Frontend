import React, { useState, useEffect, useContext } from 'react';

import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { AppContext } from '../../Context/AppContext';
import { DataContext } from '../../Context/AppData';

import CreateTask from '../../Components/createTask';
import TaskList from '../../Components/taskList';
import UserList from '../../Components/UserList';

function Project(props) {
  const globalState = useContext(AppContext);
  const history = useHistory();
  const { state } = useContext(DataContext);
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    if (!globalState.state.isLoggedIn) {
      history.push('/');
    }
  }, [globalState.state.isLoggedIn, history]);

  useEffect(() => {
    setProject(
      state.projects.filter((project) => project.project_id === +id)[0]
    );
  }, [id, state.projects]);

  return (
    <Container style={{ marginTop: 30 }}>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      {globalState.state.userInfo.role_id > 1 && <CreateTask projectId={id} />}

      <div className="project-tasks-users">
        <div className="project-tasks">
          <TaskList projectId={id} />
        </div>
        <div className="project-users">
          <UserList projectId={id} />
        </div>
      </div>
    </Container>
  );
}

export default Project;
