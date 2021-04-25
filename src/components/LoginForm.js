import {Form, Button, Row, Col, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {withRouter} from 'react-router-dom';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {postLogin} = useLogin();

  const validationSchema = yup.object({
    username: yup.string()
        .min(3, '*Usernname must have at least 3 characters')
        .max(30, 'Maximum 30 characters')
        .required('*Username is required'),
    password: yup.string()
        .min(8, '*Password must have at least 8 characters')
        .required('*Password is required'),
  });

  const initialValues = {username: '', password: ''};

  const doLogin = async (inputs) => {
    try {
      const userdata = await postLogin(inputs);
      console.log('userdata', userdata);

      localStorage.setItem('token', userdata.token);
      setUser(userdata.user);
      history.push('/home');
    } catch (e) {
      console.log('doLogin unauthorised', e.message);
    }
    console.log(inputs);
  };

  console.log(user);


  return (
    <>

      <Row className="d-flex justify-content-center">
        <Col lg={4} className="mt-5" >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              doLogin(values);
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
              }, 500);
            }}
          >
            {( {values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting}) => (

              <Form
                onSubmit={handleSubmit}
                className="p-4 rounded-lg"
                style={{backgroundColor: '#f8f8ff'}}
              >
                <div className="d-flex justify-content-center">
                  <h1>Login</h1>
                </div>
                <div className="d-flex justify-content-center my-3">
                  <Image src="logo192.png"
                    style={{width: '50px'}}/>
                </div>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className={touched.username && errors.username ?
                      'error' : null}
                  />
                  {touched.username && errors.username ? (
                    <div className="error-message">{errors.username}</div>
                  ): null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={touched.password && errors.password ?
                      'error' : null}
                  />
                  {touched.password && errors.password ? (
                    <div className="error-message">{errors.password}</div>
                  ): null}
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50 mt-3 form-btn"
                  >
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
            )}
          </Formik>
        </Col>
      </Row>
    </>

  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};
export default withRouter(LoginForm);
