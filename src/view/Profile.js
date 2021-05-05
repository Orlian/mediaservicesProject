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
import {Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import MediaTable from '../components/MediaTable';
import {Link, withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import PropTypes from 'prop-types';
import {useUsers} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {SRLWrapper} from 'simple-react-lightbox';

const Profile = ({location}) => {
  // eslint-disable-next-line no-unused-vars
  const [user] = useContext(MediaContext);
  const userInfo = location.state;
  const {postFollow, deleteFollow, getFollows, getUserAvatar, loading} = useUsers(true, user);
  const [ownFiles, setOwnFiles] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [update, setUpdate] = useState(1);
  const [mediaType, setMediaType] = useState('all');
  const [activeLink, setActiveLink] = useState('all');
  const [userAvatar, setUserAvatar] = useState({});


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
            const avatar = await getUserAvatar(user);
            setUserAvatar(avatar);
          } else if (user?.user_id === userInfo?.user_id) {
            setOwnFiles(true);
            const avatar = await getUserAvatar(user);
            setUserAvatar(avatar);
          } else {
            setOwnFiles(false);
            const follows = await getFollows(localStorage.getItem('token'));
            const avatar = await getUserAvatar(userInfo);
            setUserAvatar(avatar);
            follows.forEach((follow)=>{
              if (follow?.file_id === avatar?.file_id) {
                setFollowed(true);
              }
            });
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    })();
  }, [userInfo, user]);

  useEffect(async ()=>{

  }, [mediaType, ownFiles, followed, activeLink]);

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
                {!loading ?
                  <SRLWrapper>
                    <Card.Img src={uploadsUrl + userAvatar?.filename}
                      id="profile-card-avatar" alt={userAvatar?.title}
                      className="w-75"
                      style={{
                        maxHeight: '400px',
                      }}
                    />
                  </SRLWrapper>:
                    <Spinner className="align-self-center m-auto" animation={'border'} />
                }
              </Col>
              <Col md={{order: 'first', col: 5}} className="px-3">
                <Card.Body className="px-3">
                  <Row>
                    <Col xs={7}>
                      <Card.Title className="h4 position-relative">
                        {ownFiles ? user?.username : userInfo?.username}</Card.Title>
                    </Col>
                    <Col xs={7} className="d-flex align-items-center">
                      <Card.Text>{ownFiles ? user?.full_name.artist_name : parsedInfo?.artist_name }</Card.Text>
                    </Col>

                    {ownFiles &&
                    <Col xs={'auto'} className="ml-auto">
                      <Button
                        className="card-actions"
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
                  {!ownFiles && !followed &&
                  <Button className="w-25 font-weight-bold form-btn"
                    style={{
                      backgroundColor: '#f6aa1c',
                      border: '1px solid #f6aa1c',
                      color: '#161616',
                      borderRadius: '30em',
                      marginTop: '1rem',
                    }}
                    onClick={
                      () => {
                        try {
                          postFollow(userInfo,
                              localStorage.getItem('token'));
                          setFollowed(true);
                        } catch (e) {
                          console.log(e.message);
                        }
                      }
                    }
                  >
                    FOLLOW
                  </Button>
                  }{!ownFiles && followed &&
                <Button className="w-25 font-weight-bold form-btn"
                  style={{
                    backgroundColor: '#f6aa1c',
                    border: '1px solid #f6aa1c',
                    color: '#161616',
                    borderRadius: '30em',
                    marginTop: '1rem',
                  }}
                  onClick={
                    () => {
                      try {
                        deleteFollow(userInfo,
                            localStorage.getItem('token'));
                        setFollowed(false);
                      } catch (e) {
                        console.log(e.message);
                      }
                    }
                  }
                >
                  UNFOLLOW
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
                  className={activeLink}
                  style={activeLink === 'all' ? {
                    backgroundColor: 'inherit',
                    border: 'none',
                    color: '#f6aa1c',
                  } : {
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('all');
                      setActiveLink('all');
                    }
                  }
                >
                  ALL MEDIA
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={activeLink === 'audio'? {
                    backgroundColor: 'inherit',
                    border: 'none',
                    color: '#f6aa1c',
                  } : {
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('audio');
                      setActiveLink('audio');
                    }
                  }
                >
                  AUDIO
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={activeLink === 'video'? {
                    backgroundColor: 'inherit',
                    border: 'none',
                    color: '#f6aa1c',
                  } : {
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('video');
                      setActiveLink('video');
                    }
                  }
                >
                  VIDEOS
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button
                  className="sortButton"
                  style={activeLink === 'image'? {
                    backgroundColor: 'inherit',
                    border: 'none',
                    color: '#f6aa1c',
                  } : {
                    backgroundColor: 'inherit',
                    border: 'none',
                  }}
                  onClick={
                    ()=>{
                      setMediaType('image');
                      setActiveLink('image');
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
      <MediaTable update={update} ownFiles={ownFiles}
        currentUser={ownFiles ? user : userInfo}
        mediaType={mediaType} setUpdate={setUpdate}
      />
    </Container>
  );
};

Profile.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Profile);
