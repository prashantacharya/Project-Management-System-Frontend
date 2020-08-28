import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import http from '../utils/http';
import { Alert } from 'react-bootstrap';

function TaskList({ projectId }) {
  const globalState = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const data = await http.get(`/task/all/project/${projectId}`, {
          headers: {
            authorization: `Bearer ${globalState.state.accessToken}`,
          },
        });

        setTasks(data.payload);
        setIsLoading(false);
      } catch (error) {
        console.log(JSON.stringify(error.response));
      }
    })();
  }, [globalState.state.accessToken, projectId]);

  return (
    <>
      <h3>Tasks</h3>

      {!isLoading && !tasks.length && <p>No task created for the project</p>}

      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.task_id} task={task} />
        ))}
      </ul>
    </>
  );
}

function TaskItem({ task }) {
  return (
    <li key={task.task_id} style={{ width: '90%' }}>
      <Alert variant="secondary">
        <h5>{task.title}</h5>
        <p>
          Assigned to: <strong>{task.name}</strong>
        </p>
      </Alert>
    </li>
  );
}

export default TaskList;
