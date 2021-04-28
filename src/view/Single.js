/* eslint-disable max-len */
import BackButton from '../components/BackButton';
import {Button, Card, Col, Container, Row, InputGroup, FormControl, Form} from 'react-bootstrap';
import {MusicNoteBeamed, CardText, PencilSquare} from 'react-bootstrap-icons';
import {FaStar} from 'react-icons/fa';


const Single = () => {
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
        <Col xs={'auto'} className="mt-2">
          <h1 className="h2" id="single-title" style={{
            color: '#f8f8ff',
          }}>Title</h1>
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
                  >Username</Card.Text>
                </Card.ImgOverlay>
              </Col>

              <Col md={{order: 'first', col: 5}} className="px-3">
                <Card.Body className="px-3">
                  <Row className="d-flex justify-content-center">
                    <Col xs={'auto'}>
                      <img src="video-camera.png" alt="#"
                        style={{
                          maxWidth: '300px',
                          height: 'auto',
                        }}
                      />
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
                      <p>Consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat.</p>
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
                      <p>Rock, Metal</p>
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
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <h2>Comments</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Form>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Please comment"
                            aria-label="Comment"
                            type="text"
                            name="comment"
                            style={{
                              borderRadius: '0.25rem',
                            }}
                          />
                          <InputGroup.Append>
                            <Button type="submit" className="font-weight-bold form-btn ml-2"
                              style={{
                                backgroundColor: '#f6aa1c',
                                border: '1px solid #f6aa1c',
                                color: '#161616',
                                borderRadius: '0.25rem',
                              }}>Comment</Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div style={{
                        width: '100%',
                        height: '5rem',
                        backgroundColor: '#d3d3d3',
                      }}>s</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      </section>
    </Container>
  );
};

export default Single;
