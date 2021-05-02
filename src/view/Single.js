/* eslint-disable max-len */
import BackButton from '../components/BackButton';
import PropTypes from 'prop-types';
import {Button, Card, Col, Container, Row, InputGroup, FormControl, Form} from 'react-bootstrap';
import {MusicNoteBeamed, CardText, PencilSquare} from 'react-bootstrap-icons';
import {FaStar} from 'react-icons/fa';
import {useContext, useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {useComment, useUsers} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import CommentTable from '../components/CommentTable';
import {Formik} from 'formik';
import * as yup from 'yup';


const Single = ({location}) => {
  const [owner, setOwner] = useState(null);
  const {getUserById, getUser} = useUsers();
  const {postComment} = useComment();
  const [user] = useContext(MediaContext);

  const file = location.state;
  const desc = JSON.parse(file?.description);
  console.log('Single file', file);
  let genreString = '';


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
    comment: yup.string().min(1).required('Write something').matches(/^[a-zA-Z 0-9'*_.-]*$/,
        'Invalid characters'),
  });

  // TODO: Tästä tulee bad request oikeilla tiedoilla, selvitä
  const doComment = async (input) => {
    try {
      const result = await postComment(localStorage.getItem('token'), file.file_id, input.comment);
      console.log('doComment response', result);
    } catch (e) {
      console.error(e.message);
    }
  };


  console.log('owner', owner);

  return (
    <Container fluid
      style={{
        backgroundColor: '#161616',
        minHeight: '100vh',
      }}
    >
      <Row>
        <Col xs={'auto'} className="d-flex justify-content-center mt-2 ml-2">
          <BackButton />
        </Col>
      </Row>
      <section>
        <Container className="py-3">
          <Card
            style={{
              border: '1px solid #f8f8ff',
              backgroundColor: '#161616',
              color: '#f8f8ff',
            }}
          >
            <Row>
              <Col md={{order: 'last', col: 2}}
                className=" d-flex justify-content-md-end justify-content-center"
              >
                <Card.Img src="logo512.png" id="single-card-avatar" alt="#" className="w-75"
                  style={{
                    position: 'relative',
                    maxHeight: '400px',
                  }}
                />
                <Card.ImgOverlay>
                  <Card.Text
                    style={{
                      width: 'fit-content',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >{owner?.username} {/* JSON.parse(owner?.full_name).artist_name */}</Card.Text>
                </Card.ImgOverlay>
              </Col>

              <Col md={{order: 'first', col: 5}} className="px-3">
                <Card.Body className="px-3">
                  <Row className="d-flex justify-content-center">
                    <Col xs={'auto'}>
                      {file.media_type === 'image' &&
                      <img src={uploadsUrl + file.filename} alt={file.title}
                        style={{
                          maxWidth: '300px',
                          height: 'auto',
                        }}
                      />
                      }
                      { file.media_type === 'video' &&
                        <video src={uploadsUrl + file.filename} controls/>
                      }
                      {file.media_type === 'audio' &&
                        <audio src={uploadsUrl + file.filename} controls/>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <CardText/>
                    </Col>
                    <Col xs={'auto'}>
                      <h2 className="h5">Title:</h2>
                    </Col>
                    <Col xs={10} className="ml-5">
                      <p>{file.title}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <CardText/>
                    </Col>
                    <Col xs={'auto'}>
                      <h2 className="h5">Description:</h2>
                    </Col>
                    <Col xs={10} className="ml-5">
                      <p>{desc.description}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <MusicNoteBeamed/>
                    </Col>
                    <Col xs={'auto'}>
                      <h5>Genres:</h5>
                    </Col>
                    <Col xs={'auto'} className="pl-0">
                      <p>{genreString}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <Button
                        style={{
                          backgroundColor: '#f6aa1c',
                        }}
                      >
                        <FaStar
                          style={{
                            color: '#161616',
                          }}/>
                      </Button>
                    </Col>
                    <Col xs={'auto'} className="p-0">
                      <p
                        style={{
                          padding: '0.5rem 0',
                        }}
                      >3,7 stars</p>
                    </Col>
                    {user?.user_id === file.user_id &&
                    <Col xs={'auto'}>
                      <Button
                        style={{
                          backgroundColor: '#f6aa1c',
                        }}
                      >
                        <PencilSquare style={{
                          color: '#161616',
                        }}/>
                      </Button>
                    </Col>
                    }
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <h2>Comments</h2>
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
                            <InputGroup className="mb-3">
                              <FormControl
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
                              <div className="error-message">{errors.comment}</div>
                            ): null}
                              <InputGroup.Append>
                                <Button type="submit" className="font-weight-bold form-btn ml-2" disabled={isSubmitting}
                                  style={{
                                    backgroundColor: '#f6aa1c',
                                    border: '1px solid #f6aa1c',
                                    color: '#161616',
                                    borderRadius: '0.25rem',
                                  }}>Comment</Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                  <CommentTable file={file}/>
                </Card.Body>
              </Col>
            </Row>
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
