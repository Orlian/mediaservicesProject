import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CancelButton from '../components/CancelButton';

const Upload = () => {
  return (
    <>
      <div className="row-cols d-flex justify-content-center">
        <div className="col-lg-3 mt-5" >
          <Form
            className="p-4 rounded-lg"
            style={{backgroundColor: '#f8f8ff'}}
          >
            <h1>Upload Content</h1>
            <Form.Group controlId="form-title">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group controlId="form-title">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group controlId="form-desc">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Description" />
              <Form.Text className="text-muted">
                Enter an email you would like to share with other users.
              </Form.Text>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button type="submit"
                className="w-50 font-weight-bold form-btn"
                style={{backgroundColor: '#f6aa1c',
                  border: '1px solid #f6aa1c',
                  color: '#161616',
                  borderRadius: '30em'}}>
                REGISTER
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
