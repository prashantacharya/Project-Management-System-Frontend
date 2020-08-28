import React from 'react';
import CreateUser from './createUser';
import CreateProject from './createProject';

function AdminControls() {
  return (
    <div>
      <hr />
      <h3>Admin Controls</h3>
      <CreateUser />
      <CreateProject />
    </div>
  );
}

export default AdminControls;
