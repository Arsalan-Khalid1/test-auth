import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate('/login');
  };
  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Link to='/home' className='links'>
          <Navbar.Brand>HOME.LLC</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/home' className='links'>
              Home
            </Link>
            <Link to='/national' className='links'>
              National Insights
            </Link>
            <Link to='/local' className='links'>
              Local Insights
            </Link>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
            <Button
              variant='outline-primary'
              onClick={redirectToLogin}
              className='links'
            >
              Login
            </Button>
            <Button
              variant='outline-primary'
              onClick={redirectToRegister}
              className='links'
            >
              Register
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
