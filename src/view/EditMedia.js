/* eslint-disable max-len */
import {Button, Form, Spinner, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CancelButton from '../components/CancelButton';
import {Formik, Field} from 'formik';
import {useMedia} from '../hooks/ApiHooks';
import * as Yup from 'yup';
import {uploadsUrl} from '../utils/variables';

const EditMedia = ({history, location}) => {
  const {putMedia, loading} = useMedia();
  const mediaFile = location.state;

  const desc = JSON.parse(mediaFile.description);

  const initialValues = {
    title: mediaFile.title,
    description: desc.description,
    checked: desc.genres,
  };

  console.log(initialValues);

  const validationSchema = Yup.object({
    title: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
  });


  const doUpload = async (inputs) => {
    try {
      const data ={
        title: inputs.title,
        description: JSON.stringify({
          description: inputs.description,
          genres: inputs.checked,
        }),
      };
      const result = await putMedia(data, mediaFile.file_id,
          localStorage.getItem('token'));
      console.log('doUpload', result);
    } catch (e) {
      alert(e.message);
    } finally {
      history.push('/profile');
    }
  };

  console.log('mediaFIle', mediaFile);

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
                        <img src={uploadsUrl + mediaFile.filename}
                          style={{
                            maxWidth: '200px',
                            height: 'auto',
                          }}
                        />
                      </Col>
                    </Row>
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

EditMedia.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};


export default EditMedia;