import React, { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';
import { useHistory } from 'react-router-dom';
import AdminControls from '../../Components/adminControls';

function Home() {
  const globalState = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!globalState.state.isLoggedIn) {
      history.push('/');
    }
  }, [globalState.state.isLoggedIn, history]);

  return (
    <Container>
      <h1 style={{ margin: '20px 0' }}>
        Welcome {globalState.state.userInfo.name}
      </h1>

      {globalState.state.userInfo.role === 'Admin' && <AdminControls />}
    </Container>
  );
}

export default Home;
