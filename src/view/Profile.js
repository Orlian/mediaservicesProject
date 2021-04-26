/* eslint-disable max-len */
import BackButton from '../components/BackButton';
import {MusicNoteBeamed, GeoAltFill} from 'react-bootstrap-icons';
import {FaUserEdit} from 'react-icons/fa';
import {GiGuitar} from 'react-icons/gi';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';

const Profile = () => {
  return (
    <Container fluid
      style={{
        backgroundColor: '#161616',
        minHeight: '100vh',
      }}
    >
      <Row>
        <Col xs={1} className="mt-2 ml-2">
          <BackButton/>
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
                <Card.Img src="logo512.png" id="profile-card-avatar" alt="#" className="w-75"
                  style={{
                    maxHeight: '400px',
                  }}
                />
              </Col>
              <Col md={{order: 'first', col: 5}} className="px-3">
                <Card.Body className="px-3">
                  <Row>
                    <Col xs={7}>
                      <Card.Title className="h4 position-relative">
                    Ville Vallaton</Card.Title>
                    </Col>
                    <Col xs={{col: 'auto', offset: 3}}>
                      <Button
                        style={{
                          backgroundColor: '#f6aa1c',
                        }}
                      >
                        <FaUserEdit style={{
                          color: '#161616',
                        }}/>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <GeoAltFill/>
                    </Col>
                    <Col xs={'auto'}>
                      <h5>Helsinki</h5>
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
                      <GiGuitar/>
                    </Col>
                    <Col xs={'auto'}>
                      <h5>Skills:</h5>
                    </Col>
                    <Col xs={'auto'} className="pl-0">
                      <p>Signing, Piano</p>
                    </Col>
                  </Row>
                  <Card.Text>Consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt
                          ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam,
                          quis nostrud exercitation ullamco laboris nisi
                          ut aliquip ex ea commodo consequat.
                  </Card.Text>
                  <Button className="w-25 font-weight-bold form-btn"
                    style={{backgroundColor: '#f6aa1c',
                      border: '1px solid #f6aa1c',
                      color: '#161616',
                      borderRadius: '30em',
                      marginTop: '1rem',
                    }}>
                        FOLLOW
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <section>
            <Row className="mt-4 d-flex justify-content-center">
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}>
                  All media
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}>
                  Audio
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}>
                  Videos
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}>
                  Images
                </Button>
              </Col>
            </Row>
          </section>
        </Container>
      </section>

    </Container>
  );
};

export default Profile;
