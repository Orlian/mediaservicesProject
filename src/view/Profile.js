/* eslint-disable max-len */
import {useContext, useEffect, useState} from 'react';
import BackButton from '../components/BackButton';
import {
  MusicNoteBeamed,
  GeoAltFill,
  PersonLinesFill,
} from 'react-bootstrap-icons';
import {FaUserEdit} from 'react-icons/fa';
import {GiGuitar} from 'react-icons/gi';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import MediaTable from '../components/MediaTable';
import {Link, withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import PropTypes from 'prop-types';

const Profile = ({location}) => {
  // eslint-disable-next-line no-unused-vars
  const [user] = useContext(MediaContext);
  const userInfo = location.state;
  const [ownFiles, setOwnFiles] = useState(false);
  const [mediaType, setMediaType] = useState('all');


  console.log('ownFiles beginning', ownFiles);
  console.log('user from context', user);
  console.log('mikä olet userInfo', userInfo);


  let parsedInfo;
  if (user?.user_id !== userInfo?.user_id && user !== null && userInfo !== undefined) {
    parsedInfo = JSON.parse(userInfo?.full_name);
  }


  useEffect(()=>{
    (async ()=>{
      if (user) {
        try {
          if (userInfo === undefined) {
            setOwnFiles(true);
          } else if (user?.user_id === userInfo?.user_id) {
            setOwnFiles(true);
          } else {
            setOwnFiles(false);
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    })();
  }, [userInfo, user]);

  useEffect(()=>{

  }, [mediaType, ownFiles]);

  console.log('ownFiles end', ownFiles);
  console.log('user from context end', user);
  console.log('mikä olet userInfo end', userInfo);
  return (
    <Container fluid className="bg-dark"
      style={{
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
          <Card className="p-3">
            <Row>
              <Col md={{order: 'last', col: 2}}
                className=" d-flex justify-content-md-end justify-content-center">
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
                        {ownFiles ? user?.username : userInfo?.username}</Card.Title>
                    </Col>
                    <Col xs={7}>
                      <Card.Text>{ownFiles ? user?.full_name.artist_name : parsedInfo?.artist_name}</Card.Text>
                    </Col>

                    {ownFiles &&
                    <Col xs={{col: 'auto', offset: 3}}>
                      <Button
                        className="card-controls"
                        as={Link} to={
                          {
                            pathname: '/editprofile',
                          }
                        }
                      >
                        <FaUserEdit/>
                      </Button>
                    </Col>
                    }
                  </Row>
                  <Row className="mt-2">
                    <Col xs={'auto'}>
                      <PersonLinesFill />
                    </Col>
                    <Col xs={'auto'} className="pl-0">
                      <p>{ownFiles ? user?.email : userInfo?.email}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <GeoAltFill/>
                    </Col>
                    <Col xs={'auto'} className="pl-0">
                      <p>{ownFiles ? user?.full_name.regions : parsedInfo?.regions}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <MusicNoteBeamed/>
                    </Col>
                    <Col xs={'auto'} className="pl-0">
                      <p>{ownFiles ? user?.full_name.genres?.join(', ') : parsedInfo?.genres.join(', ') }</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={'auto'}>
                      <GiGuitar/>
                    </Col>
                    <Col xs={'auto'} className="pl-0">
                      <p>{ownFiles ? user?.full_name.skills?.join(', ') : parsedInfo?.skills.join(', ')}</p>
                    </Col>
                  </Row>
                  <Card.Text>{ownFiles ? user?.full_name.bio : parsedInfo?.bio}</Card.Text>
                  {!ownFiles &&
                  <Button className="w-25 font-weight-bold form-btn"
                    style={{
                      backgroundColor: '#f6aa1c',
                      border: '1px solid #f6aa1c',
                      color: '#161616',
                      borderRadius: '30em',
                      marginTop: '1rem',
                    }}>
                    FOLLOW
                  </Button>
                  }
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
                  }}
                  onClick={
                    ()=>{
                      setMediaType('all');
                    }
                  }
                >
                  ALL MEDIA
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('audio');
                    }
                  }
                >
                  AUDIO
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('video');
                    }
                  }
                >
                  VIDEOS
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={{
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('image');
                    }
                  }
                >
                  IMAGES
                </Button>
              </Col>
            </Row>
          </section>
        </Container>
      </section>
      <MediaTable update={true} ownFiles={ownFiles} currentUser={ownFiles ? user : userInfo}
        mediaType={mediaType}
      />
    </Container>
  );
};

Profile.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Profile);
