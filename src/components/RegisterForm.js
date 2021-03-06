/* eslint-disable max-len */
import
{Form, Button, Row, Col, Tabs, Tab} from 'react-bootstrap';
// import useForm from '../hooks/FormHooks';
import {useLogin, useMedia, useUsers, useTag} from '../hooks/ApiHooks';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {useContext, useState} from 'react';
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
  const [activeTab, setActiveTab] = useState('account-info');
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
    selected: 'Uusimaa',
    skills: [],
  };

  const doRegister = async (inputs) => {
    try {
      console.log('rekister??inti lomake l??htee', inputs);
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
          console.log('Mik?? olet avatarInfo?', avatarInfo);
          setToggle(true);
          history.push('/');
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const toNextTab =(e)=> {
    e.preventDefault();
    handleTabChange();
  };

  const handleTabChange= () => {
    if (activeTab === 'account-info') {
      setActiveTab('preferences');
    }
    if (activeTab === 'preferences') {
      setActiveTab('account-info');
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
            <Tabs className="m-4"
              activeKey={activeTab} onSelect={(k) => setActiveTab(k)}
            >
              <Tab
                eventKey="account-info"
                title="Account information"
                tabClassName="font-weight-bold">
                <Form.Group className="mx-4">
                  <Form.Text className="text-muted mb-2">Fields with an asterisk (*) are required</Form.Text>
                  <Form.Label className="font-we">Username *</Form.Label>
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
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email"
                    name="email"
                    placeholder="Email will be visible"
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
                  <Form.Label>Password *</Form.Label>
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
                  <Form.Label>Repeat password *</Form.Label>
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
                title="User information"
                tabClassName="font-weight-bold">
                <Form.Group className="mx-4">
                  <Form.Text className="text-muted mb-2">Fields with an asterisk (*) are required</Form.Text>
                  <Form.Label className="font-we">Artist name *</Form.Label>
                  <Form.Control type="text"
                    name="full_name"
                    placeholder="Display name on profile page"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.artist_name}
                    className={touched.full_name && errors.full_name ?
                                  'error' : null}/>
                  {touched.full_name && errors.full_name ? (
                    <div className="error-message">{errors.full_name}</div>
                  ): null}
                </Form.Group>
                <Form.Group
                  controlId="selectLocation"
                  className="mx-4">
                  <Form.Label>Region&nbsp;</Form.Label>
                  <Field as="select" name="selected" custom>
                    <option value="Ahvenanmaa">Ahvenanmaa</option>
                    <option value="Etel??-Karjala">Etel??-Karjala</option>
                    <option value="Etel??-Pohjanmaa">Etel??-Pohjanmaa</option>
                    <option value="Etel??-Savo">Etel??-Savo</option>
                    <option value="Kainuu">Kainuu</option>
                    <option value="Kanta-H??me">Kanta-H??me</option>
                    <option value="Keski-Pohjanmaa">Keski-Pohjanmaa</option>
                    <option value="Keski-Suomi">Keski-Suomi</option>
                    <option value="Kymmenlaakso">Kymmenlaakso</option>
                    <option value="Lappi">Lappi</option>
                    <option value="Pirkanmaa">Pirkanmaa</option>
                    <option value="Pojanmaa">Pohjanmaa</option>
                    <option value="Pohjois-Karjala">Pohjois-Karjala</option>
                    <option value="Pohjois-Pohjanmaa">Pohjois-Pohjanmaa</option>
                    <option value="Pohjois-Savo">Pohjois-Savo</option>
                    <option value="P??ij??t-H??me">P??ij??t-H??me</option>
                    <option value="Satakunta">Satakunta</option>
                    <option value="Uusimaa">Uusimaa</option>
                    <option value="Varsinais-Suomi">Varsinais-Suomi</option>
                    <option value="Other">Other</option>
                  </Field>
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
                    style={{
                      resize: 'none',
                    }}
                  />
                  {touched.bio && errors.bio ? (
                    <div className="error-message">{errors.bio}</div>
                  ): null}
                </Form.Group>
                <Form.Group className="mx-4">
                  <Form.Label>Choose skills/ instrument categories</Form.Label>
                  <div role="group" aria-labelledby="checkbox-group">
                    <Row>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills"
                            value="bowed" />
                          &nbsp;Bowed
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="brass"/>
                          &nbsp;Brass
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills"
                            value="computer" />
                          &nbsp;Computer
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills"
                            value="keyboard" />
                          &nbsp;Keyboard
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="percussion" />
                          &nbsp;Percussion
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="string"/>
                          &nbsp;String
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills" value="vocals"/>
                          &nbsp;Vocals
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="skills"
                            value="woodwind" />
                          &nbsp;Woodwind
                        </label>
                      </Col>
                    </Row>
                  </div>
                </Form.Group>
                <Form.Group className="mx-4">
                  <Form.Label className="mb-0">Choose genres</Form.Label>
                  {/* eslint-disable-next-line max-len */}
                  <Form.Text className="text-muted mb-2">Choose genres that characterise your music style</Form.Text>
                  <div role="group" aria-labelledby="checkbox-group">
                    <Row>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Alternative" />
                          &nbsp;Alternative
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Classical" />
                          &nbsp;Classical
                        </label>
                      </Col>
                      <Col xs={'auto'} >
                        <label>
                          <Field type="checkbox" name="checked" value="EDM"/>
                          &nbsp;EDM
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Electronic" />
                          &nbsp;Electronic
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Evergreens" />
                          &nbsp;Evergreens
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
                          <Field type="checkbox" name="checked"
                            value="Jazz" />
                          &nbsp;Jazz
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
                          <Field type="checkbox" name="checked" value="Pop" />
                          &nbsp;Pop
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="R&B/ Soul" />
                          &nbsp;R&B/ Soul
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="checked"
                            value="Reggae" />
                          &nbsp;Reggae
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
                          <Field type="checkbox" name="checked" value="Other"/>
                          &nbsp;Other
                        </label>
                      </Col>
                    </Row>
                  </div>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                  <Button type="submit"
                    disabled={isSubmitting}
                    className="w-50 mt-3 form-btn"
                  >REGISTER
                  </Button>
                </Form.Group>
              </Tab>
            </Tabs>
            <Form.Group className="d-flex justify-content-center">
              <Button className="w-50 tab-btn" onClick={(e) => toNextTab(e)}>{activeTab === 'account-info' ? 'NEXT' : 'BACK'}</Button>
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
