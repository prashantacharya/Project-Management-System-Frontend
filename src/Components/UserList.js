import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import http from '../utils/http';
import { Alert } from 'react-bootstrap';

function UserList({ projectId }) {
  const globalState = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await http.get(`/project/${projectId}/users`, {
          headers: {
            authorization: `Bearer ${globalState.state.accessToken}`,
          },
        });

        setUsers(data.payload);
        setIsLoading(false);
      } catch (error) {
        console.log(JSON.stringify(error.response));
      }
    })();
  }, [globalState.state.accessToken, projectId]);

  return (
    <>
      <h3>Users</h3>

      {!isLoading && !users.length && <p>No user assgined</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Alert variant="info">{user.name}</Alert>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
