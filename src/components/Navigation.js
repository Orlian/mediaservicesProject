import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';

const Navigation = () => {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home"
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
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#upload">Upload</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#favourites">Favourites</Nav.Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};


export default Navigation;

