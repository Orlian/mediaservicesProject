/* eslint-disable max-len */
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';
import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar-dark">
        <Navbar.Brand
          as={RouterLink}
          to="/home"
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
            <Nav.Link as={RouterLink} to="/home">Home</Nav.Link>
            <Nav.Link as={RouterLink} to="/upload">Upload</Nav.Link>
            <Nav.Link as={RouterLink} to="/profile">Profile</Nav.Link>
            <Nav.Link as={RouterLink} to="/favourites">Favourites</Nav.Link>
            <Nav.Link as={RouterLink} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
  ;
};


export default withRouter(Navigation);

