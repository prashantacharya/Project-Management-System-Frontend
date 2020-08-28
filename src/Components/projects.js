import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import http from '../utils/http';

import { DataContext } from '../Context/AppData';
import { AppContext } from '../Context/AppContext';

function Projects() {
  const { state, dispatch } = useContext(DataContext);
  const globalState = useContext(AppContext);

  console.log(state, globalState.state.accessToken);
  useEffect(() => {
    (async () => {
      try {
        if (globalState.state.accessToken) {
          const data = await http.get('/project', {
            headers: {
              authorization: `Bearer ${globalState.state.accessToken}`,
            },
          });

          if (data.status.toLowerCase() === 'success') {
            const { payload } = data;
            console.log(payload);
            dispatch({ type: 'SET_PROJECTS', payload });
          }
        }
      } catch (error) {
        console.log(JSON.stringify(error.response));
      }
    })();
  }, [dispatch, globalState.state.accessToken]);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Projects</h3>

      {state.projects.length === 0 && <p>Loading</p>}
      <ul className="project-list">
        {state.projects.map(({ project_id: id, name, description }) => (
          <ProjectItem id={id} name={name} description={description} key={id} />
        ))}
      </ul>
    </div>
  );
}

function ProjectItem({ id, name, description }) {
  return (
    <li className="project-item">
      <h4>
        <Link to={`/project/${id}`} title={name}>
          {name}
        </Link>
      </h4>
      <p>{description}</p>
    </li>
  );
}

export default Projects;
