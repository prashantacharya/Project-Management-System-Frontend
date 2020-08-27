import React from 'react';
import CreateUser from './CreateUser';
import CreateProject from './CreateProject';

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
