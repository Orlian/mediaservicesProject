import {Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
// import {useContext} from 'react';
import {withRouter} from 'react-router-dom';
// import {MediaContext} from '../contexts/MediaContext';
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = ({history}) => {
  // const [user, setUser] = useContext(MediaContext);
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userdata = await postLogin(inputs);
      console.log('userdata', userdata);
      localStorage.setItem('token', userdata.token);
      // setUser(userdata.user);
      history.push('/');
    } catch (e) {
      console.log('doLogin', e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, {
    username: '',
    password: '',
  });


  return (
    <>

      <div className="row-cols d-flex justify-content-center">
        <div className="col-lg-3 mt-5" >
          <Form
            onSubmit={handleSubmit}
            className="p-4 rounded-lg"
            style={{backgroundColor: '#f8f8ff'}}
          >
            <Form.Group controlId="form-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={handleInputChange}
                value={inputs.username}
                placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="form-password">
              <Form.Label>Create password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleInputChange}
                value={inputs.password}
                placeholder="Password" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="w-50" >
                LOGIN
              </Button>
            </Form.Group>
            {/*
            <Form.Group className="d-flex justify-content-center">
              <Button variant="outline-dark" type="submit" className="w-50" >
                REGISTER
              </Button>
            </Form.Group>
            */}
          </Form>
        </div>
      </div>
    </>

  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};
export default withRouter(LoginForm);
