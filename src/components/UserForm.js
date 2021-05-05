/* eslint-disable max-len */
import {
  Form,
  Button,
  FormGroup,
  Row,
  Col,
  Tabs,
  Tab,
} from 'react-bootstrap';
import {useMedia, useTag, useUsers} from '../hooks/ApiHooks';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import CancelButton from './CancelButton';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {uploadsUrl} from '../utils/variables';

const UserForm = ({user, setUser}) => {
  const {putUser, getUser, getUserAvatar} = useUsers();
  const history = useHistory();
  const {postMedia, deleteMedia} = useMedia();
  const {postTag} = useTag();
  const [currentAvatar, setCurrentAvatar] = useState({});
  const [file, setFile] = useState({file: null, dataUrl: ''});

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    const reader = new FileReader();

    const setImage = () => {
      console.log('reader result', reader.result);
      setFile((file) => ({
        ...file,
        dataUrl: reader.result,
      }));
    };

    reader.addEventListener('load', setImage);

    if (file.file !== null) {
      if (file.file.type.includes('image')) {
        reader.readAsDataURL(file.file);
      } else {
        setFile((file) => ({
          ...file,
          dataUrl: 'avatar-default.png',
        }));
      }
    }
  }, [file.file]);

  useEffect(() => {
    ( async () => {
      try {
        const avatar = await getUserAvatar(user);
        setCurrentAvatar(avatar);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [user]);
  const supportedFormats = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
    'image/heic',
    'image/heif',
    'undefined',
  ];

  const onChange = (evt) => {
    console.log('evt.currentTarget.files.type', evt.currentTarget.files[0].type);
    if (supportedFormats.includes(evt.currentTarget.files[0].type)) {
      setFile({file: evt.currentTarget.files[0]});
    } else {
      setFile({file: null, dataUrl: ''});
    }
  };

  console.log('UserForm user, avatarFile', user, currentAvatar);
  const initialValues = {
    file: null,
    artist_name: user?.full_name?.artist_name,
    bio: user?.full_name?.bio,
    genres: user?.full_name?.genres,
    regions: user?.full_name?.regions,
    skills: user?.full_name?.skills,
    email: user?.email,
    password: '',
    confirm: '',
  };


  const validationSchema = Yup.object({
    file: Yup.mixed().notRequired()
        .test(
            'fileFormat',
            'Unsupported Format',
            (value) =>{
              return value !== null ? file.file : 'undefined';
            },
        ),
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
      if (file.file !== null) {
        const fd = new FormData();
        fd.append('title', currentAvatar?.title);
        fd.append('description', currentAvatar?.description);
        fd.append('file', file.file);
        console.log('formData', fd);
        const mediaResult = await postMedia(fd, localStorage.getItem('token'));
        const tagResult = await postTag(localStorage.getItem('token'), mediaResult.file_id);
        console.log(mediaResult);
        console.log(tagResult);
        if (mediaResult && tagResult) {
          const delResult = await deleteMedia(currentAvatar.file_id, localStorage.getItem('token'));
          console.log(delResult);
        }
      }
      const fullName = {
        artist_name: inputs.artist_name,
        bio: inputs.bio,
        genres: inputs.genres,
        regions: inputs.regions,
        skills: inputs.skills,
      };
      inputs.full_name = JSON.stringify(fullName);

      if (inputs.password === '') {
        delete inputs.password;
      }
      delete inputs.file;
      delete inputs.artist_name;
      delete inputs.bio;
      delete inputs.genres;
      delete inputs.regions;
      delete inputs.skills;
      const result = await putUser(inputs, localStorage.getItem('token'));
      console.log('doUpdate', result);
      if (result) {
        alert(result.message);
        const userData = await getUser(localStorage.getItem('token'));

        const newUser = {
          email: userData.email,
          user_id: userData.user_id,
          username: userData.username,
          full_name: JSON.parse(userData.full_name),
        };

        setUser(newUser);
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
          setFieldValue,
          isSubmitting}) => (
          <Form
            onSubmit={handleSubmit}
            className="pt-4 pb-0"
          >
            <div className="d-flex justify-content-center">
              <h1>Edit Profile</h1>
            </div>
            <Tabs className="m-4">
              <Tab eventKey="account-info"
                title="User information"
                tabClassName="font-weight-bold">
                <Row className="d-flex justify-content-center">
                  <Col xs={'auto'}>
                    <img src={file.dataUrl ? file.dataUrl : uploadsUrl + currentAvatar?.filename}
                      style={{
                        maxWidth: '200px',
                        height: 'auto',
                      }}
                    />
                  </Col>
                </Row>
                <Form.Group className="mx-4">
                  <Form.Label>File</Form.Label>
                  <Form.Control
                    id="form-file"
                    name="file"
                    type="file"
                    onChange={(evt)=>{
                      handleChange(evt);
                      onChange(evt);
                    }}
                    onBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    className={touched.file && errors.file ?
                      'error' : null}
                  />
                  {touched.file && errors.file ? (
                    <div className="error-message">{errors.file}</div>
                  ): null}
                </Form.Group>
                <Form.Group className="mx-4">
                  <Form.Label>Artist name</Form.Label>
                  <Form.Control type="text"
                    name="artist_name"
                    placeholder="Full name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.artist_name}
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
                    name="bio"
                    placeholder="Tell something about yourself..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.bio}
                    style={{resize: 'none'}}
                  />
                  {touched.full_name && errors.full_name ? (
                    <div className="error-message">{errors.full_name}</div>
                  ): null}
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
                  <Form.Label className="mb-0">Change password</Form.Label>
                  <Form.Text className="text-muted mb-2">Or provide your current password</Form.Text>
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
              </Tab>
              <Tab eventKey="preferences"
                title="Preferences"
                tabClassName="font-weight-bold">
                <Form.Group className="mx-4">
                  <Form.Label className="mb-0">Choose genres</Form.Label>
                  <Form.Text className="text-muted mb-2">Choose genres that characterise your music style</Form.Text>
                  <div role="group" aria-labelledby="checkbox-group">
                    <Row>
                      <Col xs={'auto'}>
                        <label>
                          {/* eslint-disable-next-line max-len */}
                          <Field type="checkbox" name="genres" value="EDM"/>
                      &nbsp;EDM
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="genres"
                            value="Hip-hop/ Rap" />
                          &nbsp;Hip-hop/ Rap
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="genres" value="Rock"/>
                          &nbsp;Rock
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="genres" value="Pop" />
                          &nbsp;Pop
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="genres" value="Metal"/>
                          &nbsp;Metal
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <label>
                          <Field type="checkbox" name="genres"
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
                  <Field as="select" name="regions" custom>
                    <option value="Ahvenanmaa">Ahvenanmaa</option>
                    <option value="Etelä-Karjala">Etelä-Karjala</option>
                    <option value="Etelä-Pohjanmaa">Etelä-Pohjanmaa</option>
                    <option value="Etelä-Savo">Etelä-Savo</option>
                    <option value="Kainuu">Kainuu</option>
                    <option value="Kanta-Häme">Kanta-Häme</option>
                    <option value="Keski-Pohjanmaa">Keski-Pohjanmaa</option>
                    <option value="Keski-Suomi">Keski-Suomi</option>
                    <option value="Kymmenlaakso">Kymmenlaakso</option>
                    <option value="Lappi">Lappi</option>
                    <option value="Pirkanmaa">Pirkanmaa</option>
                    <option value="Pojanmaa">Pohjanmaa</option>
                    <option value="Pohjois-Karjala">Pohjois-Karjala</option>
                    <option value="Pohjois-Pohjanmaa">Pohjois-Pohjanmaa</option>
                    <option value="Pohjois-Savo">Pohjois-Savo</option>
                    <option value="Päijät-Häme">Päijät-Häme</option>
                    <option value="Satakunta">Satakunta</option>
                    <option value="Uusimaa">Uusimaa</option>
                    <option value="Varsinais-Suomi">Varsinais-Suomi</option>
                  </Field>
                </Form.Group>
              </Tab>

            </Tabs>
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
