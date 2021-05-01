import
{Form, Button, Image, FormGroup, Row, Col} from 'react-bootstrap';
// import useForm from '../hooks/FormHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import CancelButton from './CancelButton';
import {useHistory} from 'react-router-dom';

const UserForm = ({user, setUser}) => {
  const {putUser, getUser} = useUsers();

  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const initialValues = {
    email: user.email,
    full_name: user.full_name.artist_name,
    password: '',
    confirm: '',
    bio: user.full_name.bio,
    checked: [],
    selected: [],
    skills: [],
  };


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
      inputs.full_name = JSON.stringify(inputs.full_name);
      const result = await putUser(inputs, localStorage.getItem('token'));
      console.log('doUpdate', result);
      if (result) {
        alert(result.message);
        const userData = await getUser(localStorage.getItem('token'));
        console.log('mikä olet', userData);

        const newUser = {
          email: userData.email,
          user_id: userData.user_id,
          username: userData.username,
          full_name: JSON.parse(userData.full_name),
        };

        setUser(newUser);
        console.log('mikä olet new user update oletko objekti', newUser);
        history.push('/profile');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      { user &&
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          doUpdate(values);
          console.log('mikä olet', user);
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
              <Form.Label>Artist name</Form.Label>
              <Form.Control type="text"
                name="full_name.artist_name"
                placeholder="Full name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.full_name.artist_name}

              />
              {touched.full_name && errors.full_name ? (
                <div className="error-message">{errors.full_name}</div>
              ): null}
            </Form.Group>
            <Form.Group className="mx-4">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="txt"
                name="full_name.bio"
                placeholder="Tell something about yourself..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.full_name.bio}
              />
              {touched.full_name && errors.full_name ? (
                <div className="error-message">{errors.full_name}</div>
              ): null}
            </Form.Group>
            <Form.Group className="mx-4">
              <Form.Label>Choose genres</Form.Label>
              <div role="group" aria-labelledby="checkbox-group">
                <Row>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="checked" value="EDM"/>
                      EDM
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="checked"
                        value="Hip-hop/ Rap" />
                      Hip-hop/ Rap
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="checked" value="Rock"/>
                      Rock
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="checked" value="Pop" />
                      Pop
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="checked" value="Metal"/>
                      Metal
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="checked"
                        value="Alternative" />
                      Alternative
                    </label>
                  </Col>
                </Row>
              </div>
            </Form.Group>
            <Form.Group className="mx-4">
              <Form.Label>Choose skills</Form.Label>
              <div role="group" aria-labelledby="checkbox-group">
                <Row>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="skills" value="singing"/>
                      Singing
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="skills"
                        value="piano" />
                      Piano
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="skills" value="guitar"/>
                      Guitar
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="skills" value="drums" />
                      Drums
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="skills" value="violin"/>
                      Violin
                    </label>
                  </Col>
                  <Col xs={'auto'}>
                    <label>
                      <Field type="checkbox" name="skills"
                        value="hurdygurdy" />
                      Medieval hurdygurdy
                    </label>
                  </Col>
                </Row>
              </div>
            </Form.Group>
            <Form.Group
              controlId="selectLocation"
              className="mx-4">
              <Form.Label>Region</Form.Label>
              <Form.Control as="select" custom>
                <option>Helsinki</option>
                <option>Espoo</option>
                <option>Joensuu</option>
                <option>Kuusamo</option>
                <option>Mikkeli</option>
              </Form.Control>
            </Form.Group>
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
            <FormGroup className="d-flex justify-content-center">
              <CancelButton className="w-50 mt-3 outline-button"></CancelButton>
            </FormGroup>
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
