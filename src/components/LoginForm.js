import {Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoginForm = () => {
  return (

    <>

      <div className="row-cols d-flex justify-content-center">
        <div className="col-lg-3 mt-5" >
          <Form
            className="p-4 rounded-lg"
            style={{backgroundColor: '#f8f8ff'}}
          >
            <Form.Group controlId="form-username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="form-password">
              <Form.Label>Create password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="w-50" >
                LOGIN
              </Button>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="outline-dark" type="submit" className="w-50" >
                REGISTER
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>

  );
};
LoginForm.propTypes = {
  setToggle: PropTypes.func,
};
export default LoginForm;
