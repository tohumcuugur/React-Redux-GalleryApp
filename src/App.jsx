import './App.css'
import { UsersList } from './components/UsersList'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Fragment } from 'react';

function App() {

  return (
    <Fragment >
      <CssBaseline />
      <Container maxWidth="xxl">
        <UsersList />
      </Container>
    </Fragment>
  )
}

export default App
