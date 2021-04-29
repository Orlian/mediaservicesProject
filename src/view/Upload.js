/* eslint-disable max-len */
import {Button, Form, Spinner, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import CancelButton from '../components/CancelButton';
import {Formik, Field} from 'formik';
import {useMedia, useTag} from '../hooks/ApiHooks';
import * as Yup from 'yup';


const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const supportedFormats = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
    'image/heic',
    'image/heif',
    'video/gif',
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/flv',
    'audio/aac',
    'audio/wma',
    'audio/wav',
    'audio/mp4',
    'audio/mp3',
    'audio/flac',
    'audio/m4a',
    'audio/mpeg',
  ];

  const [file, setFile] = useState({file: null, dataUrl: ''});

  const onChange = (evt) => {
    console.log('jotain', evt.currentTarget.files[0].type);
    if (supportedFormats.includes(evt.currentTarget.files[0].type)) {
      setFile({file: evt.currentTarget.files[0]});
    } else {
      setFile({file: null, dataUrl: ''});
    }
  };

  const initialValues = {
    file: null,
    title: '',
    description: '',
    checked: [],
  };


  const validationSchema = Yup.object({
    file: Yup.mixed()
        .required('Required').test(
            'fileFormat',
            'Unsupported Format',
            (value) =>{
              console.log('validation file', file.file);
              return file.file ? true : false;
            },
        ),
    title: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    description: Yup.string().required('Required'),
  });


  const doUpload = async (inputs) => {
    try {
      console.log('blääh', inputs.file);
      const fd = new FormData();
      fd.append('title', inputs.title);
      // kuvaus + filtterit tallennetaan description kenttään
      const desc = {
        description: inputs.description,
        genres: inputs.checked,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', file.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      const tagResult = await postTag(localStorage.getItem('token'),
          result.file_id);
      console.log('doUpload', result, tagResult);
    } catch (e) {
      alert(e.message);
    } finally {
      history.push('/profile');
    }
  };

  useEffect(() => {
    const reader = new FileReader();

    const setImage = () => {
      setFile((file) => ({
        ...file,
        dataUrl: reader.result,
      }));
    };

    reader.addEventListener('load', setImage);

    if (file.file !== null) {
      if (file.file.type.includes('image')) {
        reader.readAsDataURL(file.file);
      } else if (file.file.type.includes('video')) {
        setFile((file) => ({
          ...file,
          dataUrl: 'video-camera.png',
        }));
      } else if (file.file.type.includes('audio')) {
        setFile((file) => ({
          ...file,
          dataUrl: 'speaker-filled-audio-tool.png',
        }));
      } else {
        setFile((file) => ({
          ...file,
          dataUrl: 'logo512.png',
        }));
      }
    }

    return () => {
      reader.removeEventListener('load', setImage);
    };
  }, [file.file]);

  console.log('inputs', file);

  return (
    <>
      <div
        className="container-fluid"
        style={{backgroundImage: 'url(bg-image.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative'}}
      >
        <div className="row-cols d-flex justify-content-center">
          <div className="col-lg-3 mt-5 mb-5" >
            {!loading ?
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                doUpload(values);
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
                  className="p-4 rounded-lg"
                  style={{backgroundColor: '#f8f8ff'}}
                >
                  <h1>Upload Content</h1>
                  <Row className="d-flex justify-content-center">
                    <Col xs={'auto'}>
                      <img src={file.dataUrl}
                        style={{
                          maxWidth: '200px',
                          height: 'auto',
                        }}
                      />
                    </Col>
                  </Row>
                  <Form.Group>
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
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                    {touched.title && errors.title ? (
                      <div className="error-message">{errors.title}</div>
                    ): null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"
                      placeholder="Description"
                      name="description"
                      as="textarea"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      style={{
                        resize: 'none',
                      }}
                    />
                    {touched.description && errors.description ? (
                      <div className="error-message">{errors.description}</div>
                    ): null}
                  </Form.Group>
                  <Form.Group>
                    <h2 className="h6">Choose genres</h2>
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
                  <Form.Group className="d-flex justify-content-center">
                    <Button type="submit"
                      className="w-50 font-weight-bold form-btn"
                      style={{
                        backgroundColor: '#f6aa1c',
                        border: '1px solid #f6aa1c',
                        color: '#161616',
                        borderRadius: '30em',
                      }}>
                  UPLOAD
                    </Button>
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-center">
                    <CancelButton/>
                  </Form.Group>
                </Form> )}
            </Formik>:
            <Spinner animation="border" />
            }
          </div>
        </div>
      </div>
    </>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};


export default Upload;
