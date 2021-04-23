import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CancelButton from '../components/CancelButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';


const Upload = () => {
  const formik = useFormik({
    initialValues: {
      file: null,
      title: '',
      desc: '',
      checked: [],
    },
    validationSchema: Yup.object({
      file: Yup.string()
          .required('Required'),
      title: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
      desc: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <div className="row-cols d-flex justify-content-center">
        <div className="col-lg-3 mt-5" >
          <Form
            onSubmit={formik.handleSubmit}
            className="p-4 rounded-lg"
            style={{backgroundColor: '#f8f8ff'}}
          >
            <h1>Upload Content</h1>
            <Form.Group controlId="form-title">
              <Form.label>File</Form.label>
              <Form.Control
                id="form-file"
                name="file"
                accept="image/*, audio/*, video/*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.file}
              />
              {formik.touched.file && formik.errors.file ? (
                <div>{formik.errors.file}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="form-title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="form-desc">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text"
                placeholder="Description"
                name="desc"
                as="textarea"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desc}
                style={{
                  resize: 'none',
                }}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div>{formik.errors.desc}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <h2>Choose genres</h2>
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check inline label="EDM"
                    type={type} id={`inline-${type}-1`}
                    name="checked"
                    value="EDM"
                  />
                  <Form.Check inline label="Hip-hop/ Rap"
                    type={type} id={`inline-${type}-2`}
                    name="checked"
                    value="Hip-hop/ Rap"
                  />
                  <Form.Check
                    inline
                    label="Rock"
                    type={type}
                    id={`inline-${type}-3`}
                    name="checked"
                    value="Rock"
                  />
                  <Form.Check
                    inline
                    label="Pop"
                    type={type}
                    id={`inline-${type}-4`}
                    name="checked"
                    value="Pop"
                  />
                  <Form.Check
                    inline
                    label="Metal"
                    type={type}
                    id={`inline-${type}-5`}
                    name="checked"
                    value="Metal"
                  />
                  <Form.Check
                    inline
                    label="Alternative"
                    type={type}
                    id={`inline-${type}-6`}
                    name="checked"
                    value="Alternative"
                  />
                </div>
              ))}
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit"
                className="w-50 font-weight-bold form-btn"
                style={{backgroundColor: '#f6aa1c',
                  border: '1px solid #f6aa1c',
                  color: '#161616',
                  borderRadius: '30em'}}>
                UPLOAD
              </Button>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <CancelButton/>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};


export default Upload;
