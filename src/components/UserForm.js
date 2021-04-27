import
{Form, Button, Image} from 'react-bootstrap';
// import useForm from '../hooks/FormHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Formik} from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const UserForm = ({user, setUser}) => {
  const {putUser, getUser} = useUsers();
  console.log(user);


  const validationSchema = yup.object({
    email: yup.string()
        .email('*Must be a valid email address'),
    password: yup.string()
        .min(8, '*Password must have at least 8 characters'),
    confirm: yup.string()
        .min(8, '*Password must have at least 8 characters')
        .oneOf([yup.ref('password'), null], '*Passwords must match'),
  });

  const doUpdate = async (inputs) => {
    try {
      console.log('user muokkaus lomake lähtee');
      delete inputs.confirm;
      const result = await putUser(inputs, localStorage.getItem('token'));
      console.log('doUpdate', result);
      if (result) {
        alert(result.message);
        const userData = await getUser(localStorage.getItem('token'));
        setUser(userData);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      { user &&
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          doUpdate(values);
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
            className="pt-4 pb-0"
          >
            <div className="d-flex justify-content-center">
              <h1>Update User</h1>
            </div>
            <div className="d-flex justify-content-center my-3">
              <Image src="logo192.png"
                style={{width: '50px'}}/>
            </div>
            <Form.Group className="mx-4">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.email}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ): null}
            </Form.Group>
            <Form.Group className="mx-4">
              <Form.Label>Change password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.password}
                className={touched.password && errors.password ?
                              'error' : null}/>
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ): null}
            </Form.Group>
            <Form.Group className="mx-4">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control type="password"
                name="confirm"
                placeholder="Repeat password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.confirm}
                className={touched.confirm && errors.confirm ?
                              'error' : null}/>
              {touched.confirm && errors.confirm? (
                <div className="error-message">{errors.confirm}</div>
              ): null}
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit"
                disabled={isSubmitting}
                className="w-50 mt-3 form-btn"
              >
                UPDATE
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
      }
    </>
  );
};


UserForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};


export default UserForm;
