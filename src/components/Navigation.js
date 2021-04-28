/* eslint-disable max-len */
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';
import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';


const Navigation = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        const newUser = {
          email: userData.email,
          user_id: userData.user_id,
          username: userData.username,
          full_name: JSON.parse(userData.full_name),
        };

        console.log('tuletko tästä?', userData);
        console.log('oletko objekti?', newUser);
        setUser(newUser);
      } catch (e) {
        // send to login
        history.push('/');
      }
    };
    checkUser();
  }, []);


  return (
    <>
      <Navbar expand="lg" className="navbar-dark">
        <Navbar.Brand
          as={RouterLink}
          to="/"
          style={{
            paddingLeft: '1.25rem',
          }}
        >
          <img
            src="logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Form inline className="mr-0 position-absolute"
          style={{
            left: '50%',
            top: '0.5rem',
            webkitTransform: 'translateX(-50%)',
            transform: 'translateX(-50%)',
          }}
        >
          <FormControl type="text"
            placeholder="Search users by tag"
            className="mr-sm-5 w-100 pr-5 position-relative"
          />
          <Button
            className="position-absolute"
            style={{
              right: '48px',
              backgroundColor: 'inherit',
              border: 'none',
            }}
          >
            <Search color="#161616"/>
          </Button>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end w-100">


            <Nav.Link as={RouterLink} to="/">Home</Nav.Link>
            {user && <><Nav.Link as={RouterLink} to="/upload">Upload</Nav.Link>
              <Nav.Link as={RouterLink} to="/profile">Profile</Nav.Link>
              <Nav.Link as={RouterLink} to="/favourites">Favourites</Nav.Link>
            </>}
            {user ? <Nav.Link as={RouterLink} to="/logout">Logout</Nav.Link> :
              <Nav.Link as={RouterLink} to="/login">Login</Nav.Link> }


          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
  ;
};


Navigation.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Navigation);

