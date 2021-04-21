/* eslint-disable max-len */
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';
import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <Navbar>
        <Navbar.Brand
          style={{
            paddingLeft: '1.25rem',
          }}
        >
          <RouterLink to="/home">
            <img
              src="logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </RouterLink>
        </Navbar.Brand>
        <Form inline className="mr-0 position-absolute"
          style={{
            left: '50%',
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
        <Nav className="justify-content-end w-100">
          <Nav.Link href="#home"><RouterLink to="/home">Home</RouterLink></Nav.Link>
          <Nav.Link href="#upload"><RouterLink to="/upload">Upload</RouterLink></Nav.Link>
          <Nav.Link href="#profile"><RouterLink to="/profile">Profile</RouterLink></Nav.Link>
          <Nav.Link href="#favourites"><RouterLink to="/favourites">Favourites</RouterLink></Nav.Link>
          <Nav.Link href="#logout"><RouterLink to="/logout">Logout</RouterLink></Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};


export default withRouter(Navigation);

