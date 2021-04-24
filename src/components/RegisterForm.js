import {Form, Button} from 'react-bootstrap';
// import useForm from '../hooks/FormHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Formik} from 'formik';
import * as yup from 'yup';

const RegisterForm = () => {
  const {register, getUserAvailable} = useUsers();

  const checkUsername = async (value) => {
    try {
      const available = await getUserAvailable(value);
      console.log('onko vapaana', available);
      return available;
    } catch (e) {
      console.log(e.message);
      return true;
    }
  };

  const validationSchema = yup.object({
    username: yup.string()
        .min(3, '*Usernname must have at least 3 characters')
        .max(30, 'Maximum 30 characters')
        .required('*Username is required')
        .test('usernameTaken', '*Username is already taken', checkUsername),
    email: yup.string()
        .email('*Must be a valid email address')
        .required('*Email is required'),
    password: yup.string()
        .min(8, '*Password must have at least 8 characters')
        .required('*Password is required'),
    confirm: yup.string()
        .min(8, '*Password must have at least 8 characters')
        .required('*Password is required')
        .oneOf([yup.ref('password'), null], '*Passwords must match'),
  });

  const initialValues = {username: '', email: '', password: '', confirm: ''};
  const doRegister = async (inputs) => {
    try {
      const available = await getUserAvailable(inputs.username);
      console.log('available', available);
      if (available) {
        console.log('rekisteröinti lomake lähtee', inputs);
        delete inputs.confirm;
        const result = await register(inputs);
        if (result.message.length > 0) {
          alert(result.message);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };


  return (
    <>

      {/* eslint-disable-next-line max-len */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          doRegister(values);
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {/* Callback function containing Formik state and helpers that handle
        common form actions */}

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
            <Form.Group controlId="form-username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={touched.username && errors.username ?
                  'error' : null}/>
              {/* Applies the proper error message from validateSchema when
              the user has clicked the element and there is an error, also
              applies the .error-message CSS class for styling */}
              {touched.username && errors.username ? (
                <div className="error-message">{errors.username}</div>
              ): null}
            </Form.Group>
            <Form.Group controlId="form-email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'error' : null}/>
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ): null}
            </Form.Group>
            <Form.Group controlId="form-password">
              <Form.Label>Create password</Form.Label>
              <Form.Control type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={touched.password && errors.password ?
                  'error' : null}/>
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ): null}
            </Form.Group>
            <Form.Group controlId="form-confirm">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control type="password"
                name="confirm"
                placeholder="Repeat password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm}
                className={touched.confirm && errors.confirm ? 'error' : null}/>
              {touched.confirm && errors.confirm? (
                <div className="error-message">{errors.confirm}</div>
              ): null}
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit"
                disabled={isSubmitting}
                className="w-50 font-weight-bold form-btn"
                style={{backgroundColor: '#f6aa1c',
                  border: '1px solid #f6aa1c',
                  color: '#161616',
                  borderRadius: '30em'}}>
                REGISTER
              </Button>
            </Form.Group>
            {/*
            <Form.Group className="d-flex justify-content-center ">
              <Button type="submit" className="w-50 font-weight-bold form-btn"
                style={{backgroundColor: '#f8f8ff',
                  color: '#161616',
                  border: '1px solid #161616',
                  borderRadius: '30em'}}>
                LOGIN
              </Button>
            </Form.Group>
            */}
          </Form>
        )}
      </Formik>
    </>

  );
};


export default RegisterForm;
