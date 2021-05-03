/* eslint-disable max-len */
import BackButton from '../components/BackButton';
import PropTypes from 'prop-types';
import {Button, Card, Col, Container, Row, InputGroup, FormControl, Form, Modal} from 'react-bootstrap';
import {MusicNoteBeamed, PencilSquare} from 'react-bootstrap-icons';
import {FaStar} from 'react-icons/fa';
import {useContext, useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {useComment, useRating, useUsers} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import CommentTable from '../components/CommentTable';
import {Formik} from 'formik';
import * as yup from 'yup';
import RatingForm from '../components/RatingForm';


const Single = ({location}) => {
  const [smShow, setSmShow] = useState(false);
  const [owner, setOwner] = useState(null);
  const {getUserById, getUser} = useUsers();
  const [update, setUpdate] = useState(1);
  const {postComment} = useComment();
  const [user] = useContext(MediaContext);
  const file = location.state;
  const {rating, setRating, avgRating} = useRating(user, file?.file_id, update);
  const desc = JSON.parse(file?.description);
  console.log('Single file', file);
  let genreString = '';
  console.log('avgRating', avgRating);

  {JSON.parse(file.description).genres?.forEach(
      (genre) =>{
        genreString += genre + ' ';
      },
  );}

  useEffect(()=>{
    (async ()=>{
      try {
        setOwner(await getUserById(localStorage.getItem('token'),
            file.user_id));
        const result = await getUser(localStorage.getItem('token'));
        console.log('owner id, getUser id', owner?.user_id, result?.user_id);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const validationSchema = yup.object({
    comment: yup.string().min(1).required('Write something').matches(/^[a-zA-Z 0-9'*:;_.-]*$/,
        'Invalid characters'),
  });
  const doComment = async (input) => {
    try {
      const result = await postComment(localStorage.getItem('token'), file.file_id, input.comment);
      console.log('doComment response', result);
      if (result) {
        const newUpdate = update + 1;
        setUpdate(newUpdate);
      }
    } catch (e) {
      console.error(e.message);
    }
  };


  console.log('owner', owner);

  return (
    <Container
      fluid className="bg-dark"
      style={{
        minHeight: '100vh',
      }}>
      <Row>
        <Col xs={'auto'} className="d-flex justify-content-center mt-2 ml-2">
          <BackButton />
        </Col>
      </Row>
      <section>
        <Container className="py-3">
          <Card className="h-auto" xs={12}
          >
            <Card.Text
              className="font-weight-bold pl-4 py-2 mb-0">
              {owner?.username}</Card.Text>
            <Card.Header
              className="d-flex justify-content-center p-0 m-0"
              style={{
                width: '100%',
                height: '100%',
              }}>
              {file.media_type === 'image' &&
              <img src={uploadsUrl + file.filename} alt={file.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
              }
              { file.media_type === 'video' &&
              <video src={uploadsUrl + file.filename} controls
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}/>
              }
              {file.media_type === 'audio' &&
              <audio src={uploadsUrl + file.filename} controls
                className="mb-4"
                style={{
                  width: '80%',
                }}/>
              }
            </Card.Header>
            <Card.Body>
              <Card.Title className="mb-1">{file.title}</Card.Title>
              <div className="d-flex text-muted">
                <MusicNoteBeamed/>
                <Card.Text className="ml-2 mb-3">{genreString}</Card.Text>
              </div>
              <Card.Text>{desc.description}</Card.Text>
              <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    Small Modal
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body><RatingForm rating={rating} setRating={setRating} user={user} update={update} setUpdate={setUpdate} fileId={file.file_id}/></Modal.Body>
              </Modal>
              <Row className="d-flex justify-content-end">
                <Col xs={'auto'} >
                  <Button className="card-actions" onClick={() => setSmShow(true)}>
                    <FaStar style={{
                      fontSize: '18px',
                    }}/>
                  </Button>
                  <Card.Text variant="small" className=" text-muted my-2 mx-0">{avgRating === 0 ? 'No ratings yet' : avgRating}</Card.Text>

                </Col>
                {user?.user_id === file.user_id &&
                    <Col xs={'auto'}>
                      <Button className="card-controls">
                        <PencilSquare
                          style={{
                            fontSize: '18px',
                          }}/>
                      </Button>
                    </Col>
                }
              </Row>
              <Row>
                <Col xs={12}>
                  <Formik initialValues={{comment: ''}} validationSchema={validationSchema} onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    doComment(values);
                    setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                    }, 500);
                  }}>
                    {( {values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting}) => (
                      <Form onSubmit={handleSubmit}>
                        <InputGroup className="my-3">
                          <FormControl
                            as="textarea" rows={2}
                            placeholder="Please comment"
                            aria-label="Comment"
                            type="text"
                            name="comment"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={touched.comment && errors.comment ?
                                  'error' : null}
                            value={values.comment}
                            style={{
                              borderRadius: '0.25rem',
                            }}
                          />{touched.comment && errors.comment ? (
                              <div className="error-message comment-error">{errors.comment}</div>
                            ): null}
                          <InputGroup.Append className="d-flex align-items-center">
                            <Button type="submit" className="font-weight-bold form-btn ml-2 comment-btn" disabled={isSubmitting}
                              style={{
                                backgroundColor: '#f6aa1c',
                                border: '1px solid #f6aa1c',
                                color: '#161616',
                                borderRadius: '3em',
                                height: '2.5em',
                              }}>Comment</Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
              <Row>
                <Card.Title className="ml-3 mt-3">Comments</Card.Title>
              </Row>
              <CommentTable file={file} update={update} setUpdate={setUpdate}/>
            </Card.Body>


          </Card>
        </Container>
      </section>
    </Container>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
