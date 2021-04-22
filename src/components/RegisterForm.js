import {Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';


const RegisterForm = () => {
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
            <Form.Group controlId="form-email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                Enter an email you would like to share with other users.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="form-password">
              <Form.Label>Create password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="form-confirm">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control type="password" placeholder="Repeat password" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit"
                className="w-50 font-weight-bold form-btn"
                style={{backgroundColor: '#f6aa1c',
                  border: '1px solid #f6aa1c',
                  color: '#161616',
                  borderRadius: '30em'}}>
                REGISTER
              </Button>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center ">
              <Button type="submit" className="w-50 font-weight-bold form-btn"
                style={{backgroundColor: '#f8f8ff',
                  color: '#161616',
                  border: '1px solid #161616',
                  borderRadius: '30em'}}>
                LOGIN
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>

  );
};
RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};
export default RegisterForm;
