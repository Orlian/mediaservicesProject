import
{Form, Button, Row, Col, Tabs, Tab} from 'react-bootstrap';
// import useForm from '../hooks/FormHooks';
import {useLogin, useMedia, useUsers, useTag} from '../hooks/ApiHooks';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {dataUri, dataURItoBase} from '../utils/avatarImg';
import {MediaContext} from '../contexts/MediaContext';
import {useHistory} from 'react-router-dom';


const RegisterForm = ({setToggle}) => {
  const {register, getUserAvailable} = useUsers();
  const {postMedia} = useMedia();
  const {postLogin} = useLogin();
  const history = useHistory();
  const {postTag} = useTag();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const checkUsername = async (value) => {
    if (value?.length > 2) {
      try {
        return await getUserAvailable(value);
      } catch (e) {
        console.log(e.message);
        return true;
      }
    }
  };

  const validationSchema = yup.object({
    username: yup.string()
        .min(3, '*Usernname must have at least 3 characters')
        .max(30, 'Maximum 30 characters')
        .required('*Username is required')
        .matches(/^[a-zA-Z0-9_.-]*$/,
            // eslint-disable-next-line max-len
            'Username may contain letters, numbers, dots, hyphens and underscores ')
        .test('usernameTaken', '*Username is already taken', checkUsername),
    full_name: yup.string()
        .min(3, '*Please write at least 3 characters')
        .max(100, 'Maximum 30 characters')
        .required('*Required field')
        .matches(/^[a-zA-Z0-9_.-]*$/,
            // eslint-disable-next-line max-len
            'Field may contain letters, numbers, dots, hyphens and underscores '),
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

  // eslint-disable-next-line max-len
  const initialValues = {
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirm: '',
    bio: '',
    checked: [],
    selected: 'Southern Finland',
    skills: [],
  };

  const doRegister = async (inputs) => {
    try {
      console.log('rekisteröinti lomake lähtee', inputs);
      const available = await getUserAvailable(inputs.username);
      console.log('available', available);

      const userInfo = {
        artist_name: inputs.full_name,
        bio: inputs.bio,
        skills: inputs.skills,
        genres: inputs.checked,
        regions: inputs.selected,
      };

      inputs.full_name = JSON.stringify(userInfo);


      console.log('uusi inputs', inputs);

      if (available) {
        delete inputs.confirm;
        delete inputs.bio;
        const checked = inputs.checked;
        const selected = inputs.selected;
        const skills = inputs.skills;
        delete inputs.checked;
        delete inputs.selected;
        delete inputs.skills;
        const result = await register(inputs);
        if (result.message.length > 0) {
          alert(result.message);
          const userdata = await postLogin(inputs);
          console.log('userdata', userdata);
          localStorage.setItem('token', userdata.token);
          const newUser = {
            email: userdata.user.email,
            user_id: userdata.user.user_id,
            username: userdata.user.username,
            full_name: JSON.parse(userdata.user.full_name),
          };
          setUser(newUser);
          // TODO: genres: inputs.genres,
          //             skills: inputs.skills,
          //             location: inputs.location,
          const avatarInfo = {
            skills: skills,
            genres: checked,
            regions: selected,
          };

          const {dataView, mimeString} = dataURItoBase(dataUri);
          const fd = new FormData();
          fd.append('file', new Blob([dataView], {type: mimeString}));
          fd.append('title', newUser.username);
          fd.append('description', JSON.stringify(avatarInfo));
          const mediaResult = await postMedia(fd, userdata.token);
          const tagResult = await postTag(userdata.token, mediaResult.file_id);
          console.log('Register results', mediaResult, tagResult);
          console.log('Mikä olet avatarInfo?', avatarInfo);
          setToggle(true);
          history.push('/');
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
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
              <h1>Register</h1>
            </div>
            <Tabs className="m-4">
              <Tab
                eventKey="account-info"
                title="User information"
                tabClassName="font-weight-bold">
                <Form.Group className="mx-4">
                  <Form.Label className="font-we">Username</Form.Label>
                  <Form.Control type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className={touched.username && errors.username ?
                  'error' : null}/>
                  {touched.username && errors.username ? (
                <div className="error-message">{errors.username}</div>
              ): null}
                </Form.Group>
                <Form.Group className="mx-4">
                  <Form.Label className="font-we">Artist name</Form.Label>
                  <Form.Control type="text"
                    name="full_name"
                    placeholder="Artist name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.artist_name}
                    className={touched.full_name && errors.full_name ?
                              'error' : null}/>
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
                    name="bio"
                    placeholder="Tell something about yourself..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.bio}
                  />
                  {touched.full_name && errors.full_name ? (
                    <div className="error-message">{errors.full_name}</div>
                  ): null}
                </Form.Group>
                <Form.Group className="mx-4">
                  <Form.Label>Artist email</Form.Label>
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
                  {/* eslint-disable-next-line max-len */}
                </Form.Group>
                <Form.Group className="mx-4">
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
                <Form.Group className="mx-4">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control type="password"
                    name="confirm"
                    placeholder="Repeat password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm}
                    className={touched.confirm && errors.confirm ?
                                  'error' : null}/>
                  {touched.confirm && errors.confirm? (
                    <div className="error-message">{errors.confirm}</div>
                  ): null}
                </Form.Group>
              </Tab>
              <Tab
                eventKey="preferences"
                title="Preferences"
                tabClassName="font-weight-bold">
                <Form.Group className="mx-4">
                  <Form.Label className="mb-0">Choose genres</Form.Label>
                  {/* eslint-disable-next-line max-len */}
                  <Form.Text className="text-muted mb-2">Choose genres that characterize your music style</Form.Text>
                  <div role="group" aria-labelledby="checkbox-group">
                    <Row>
                      <Col xs={'auto'} >
                        <label>
                          <Field type="checkbox" name="checked" value="EDM"/>
                          &nbsp;EDM
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Hip-hop/ Rap" />
                          &nbsp;Hip-hop/ Rap
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked" value="Rock"/>
                          &nbsp;Rock
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked" value="Pop" />
                          &nbsp;Pop
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked" value="Metal"/>
                          &nbsp;Metal
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Alternative" />
                          &nbsp;Alternative
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
                          &nbsp;Singing
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills"
                            value="piano" />
                          &nbsp;Piano
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="guitar"/>
                          &nbsp;Guitar
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="drums" />
                          &nbsp;Drums
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="violin"/>
                          &nbsp;Violin
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills"
                            value="hurdygurdy" />
                          &nbsp;Hurdygurdy
                        </label>
                      </Col>
                    </Row>
                  </div>
                </Form.Group>
                <Form.Group
                  controlId="selectLocation"
                  className="mx-4">
                  <Form.Label>Region&nbsp;</Form.Label>
                  <Field as="select" name="selected" custom>
                    <option value="Southern Finland">Southern Finland</option>
                    <option value="Western Finland">Western Finland</option>
                    <option value="Eastern Finland">Eastern Finland</option>
                    <option value="Oulu">Oulu</option>
                    <option value="Lapland">Lapland</option>
                    <option value="Åland">Åland</option>

                  </Field>
                </Form.Group>


              </Tab>
            </Tabs>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit"
                disabled={isSubmitting}
                className="w-50 mt-3 form-btn"
              >REGISTER
              </Button>
            </Form.Group>

          </Form>
        )}
      </Formik>

    </>

  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
