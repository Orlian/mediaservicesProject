/* eslint-disable max-len */
import BackButton from '../components/BackButton';
import PropTypes from 'prop-types';
import {Button, Card, Col, Container, Row, InputGroup, FormControl, Form, Modal} from 'react-bootstrap';
import {MusicNoteBeamed, PencilSquare, Trash} from 'react-bootstrap-icons';
import {SRLWrapper} from 'simple-react-lightbox';
import {FaStar, FaRegStar} from 'react-icons/fa';
import {useContext, useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {useComment, useMedia, useRating, useUsers} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import CommentTable from '../components/CommentTable';
import {Formik} from 'formik';
import * as yup from 'yup';
import RatingForm from '../components/RatingForm';
import {Link} from 'react-router-dom';
import moment from 'moment';


const Single = ({location, history}) => {
  const {deleteMedia} = useMedia();
  const [smShow, setSmShow] = useState(false);
  const [owner, setOwner] = useState(null);
  const {getUserById, getUser} = useUsers();
  const [update, setUpdate] = useState(1);
  const {postComment} = useComment();
  const [user] = useContext(MediaContext);
  const file = location.state;
  const {rating, setRating, avgRating} = useRating(user, file?.file_id, update);
  const desc = JSON.parse(file?.description);
  let genreString = '';

  genreString = JSON.parse(file.description).genres?.join(', ');
  const options = {
    setting: {
      autoplaySpeed: 0,
      disableKeyboardControls: true,
      disableWheelControls: true,
    },
    buttons: {
      showAutoplayButton: false,
      showThumbnailsButton: false,
      showNextButton: false,
      showPrevButton: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

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
    comment: yup.string().min(1).required('Write something').matches(/^[a-zA-Z???????????? 0-9'*:!?;_.-]*$/,
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
                <SRLWrapper options={options}>
                  <img src={uploadsUrl + file.filename} alt={file.title}
                    style={{
                      width: '100%',
                      maxHeight: '800px',
                      objectFit: 'cover',
                    }}
                  />
                </SRLWrapper>
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
                <Card.Text className="ml-2 mb-3">{genreString === '' ? 'No genres' : genreString}</Card.Text>
              </div>
              <Card.Text>{desc.description === '' ? 'No description' : desc.description}</Card.Text>
              <Card.Text className="text-muted">{moment(file.time_added).format('HH:mm DD-MM-YYYY')}</Card.Text>
              <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    Rate {file.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body><RatingForm rating={rating} setRating={setRating} user={user} update={update} setUpdate={setUpdate} fileId={file.file_id}/></Modal.Body>
              </Modal>
              <Row className="d-flex justify-content-end">
                <Col xs={'auto'} className="d-flex single-controls">
                  <Card.Text variant="small" className=" text-muted my-2 mx-0 no-ratings">{isNaN(avgRating) ? 'No ratings yet' : avgRating}</Card.Text>
                  <div className="actions-btn-container">
                    <Button variant={null} className="card-actions ml-2" onClick={() => setSmShow(true)}>
                      {rating === 0 ?
                      <FaRegStar style={{
                        fontSize: '18px',
                      }}/>:
                    <FaStar
                      style={{
                        fontSize: '18px',
                      }}/>
                      }
                    </Button>
                    {user?.user_id === file.user_id &&
                  <>
                    <Button variant={null} as={Link} to={
                      {
                        pathname: '/editmedia',
                        state: file,
                      }
                    }
                    className="card-actions">
                      <PencilSquare
                        style={{
                          fontSize: '18px',
                        }}/>
                    </Button>
                    <Button variant={null}
                      className="card-actions"
                      onClick={async () => {
                        try {
                          const conf = confirm('Do you really want to delete?');
                          if (conf) {
                            const response = await deleteMedia(file.file_id,
                                localStorage.getItem('token'));
                            console.log(response);
                          }
                          history.push('/profile');
                        } catch (e) {
                          console.log(e.message);
                        }
                      }
                      }
                    >
                      <Trash/>
                    </Button>
                  </>
                    }
                  </div>
                </Col>
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
                        <InputGroup className="my-3 comments" >
                          <FormControl
                            id="comments-field"
                            as="textarea" rows={1}
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
                              resize: 'none',
                            }}
                          />{touched.comment && errors.comment ? (
                              <div className="error-message comment-error" style={{paddingTop: '4em'}}>{errors.comment}</div>
                            ): null}
                          <InputGroup.Append className="d-flex align-items-center comments-button justify-content-end">
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
  history: PropTypes.object,
};

export default Single;
