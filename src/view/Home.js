/* eslint-disable max-len */
import {Container, Col, Row, Button, Image, Spinner} from 'react-bootstrap';
import UserTable from '../components/UserTable';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useUsers} from '../hooks/ApiHooks';
import {Link, withRouter} from 'react-router-dom';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const {getUser, loading} = useUsers();
  const [sortType, setSortType] = useState('all');
  const [activeLink, setActiveLink] = useState('all');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        const newUser = {
          email: userData.email,
          user_id: userData.user_id,
          username: userData.username,
          full_name: JSON.parse(userData.full_name),
        };

        setUser(newUser);
      } catch (e) {
      }
    };
    checkUser();
  }, []);

  useEffect(()=>{

  }, [activeLink]);

  return (
    <>
      <Container fluid className="bg-dark home-container pb-5"
        id="home">
        <Row>
          <Col xs={12} className="banner"
            style={{
              backgroundImage: 'url("bg-image.jpg")',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '85vh',
              position: 'relative',
            }}
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                height: '85vh',
              }}>
              <div className="p-3"
                style={{background: 'rgba(0, 0, 0, 0.4)'}}>
                <h1>Musikantti</h1>
                <h2>Bringing music creators together</h2>
              </div>
              <div className="d-flex flex-column justify-content-between">
                {user ?
                  <Button
                    className="mt-5 banner-btn px-5 py-2"
                    href="#home-cards-area"
                  >DISCOVER
                  </Button> : <> <Button
                    className="mt-5 banner-btn px-5 py-2"
                    as={Link} to={
                      {
                        pathname: '/login',
                      }
                    }>
                    REGISTER
                  </Button>
                  <Button href="#about" className="mt-3 about-button">ABOUT</Button>
                  </>
                }
              </div>
            </div>
          </Col>
        </Row>
        {user ?
          <>
            <Row id="home-cards-area">
              <Col xs={12}>
                <h2 className="text-center p-5">
                  Get to know these creators</h2>
              </Col>
            </Row>
            <section>
              <Row className="mt-4 d-flex justify-content-center">
                <Col xs={'auto'}>
                  <Button
                    className="sortButton"
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
                        setSortType('all');
                        setActiveLink('all');
                      }
                    }
                  >
                    All matches
                  </Button>
                </Col>
                <Col xs={'auto'}>
                  <Button
                    className="sortButton"
                    style={activeLink === 'skills' ? {
                      backgroundColor: 'inherit',
                      border: 'none',
                      color: '#f6aa1c',
                    } : {
                      backgroundColor: 'inherit',
                      border: 'none',
                    }}
                    onClick={
                      ()=>{
                        setSortType('skills');
                        setActiveLink('skills');
                      }
                    }
                  >
                    Skill matches
                  </Button>
                </Col>
                <Col xs={'auto'}>
                  <Button
                    className="sortButton"
                    style={activeLink === 'genres' ? {
                      backgroundColor: 'inherit',
                      border: 'none',
                      color: '#f6aa1c',
                    } : {
                      backgroundColor: 'inherit',
                      border: 'none',
                    }}
                    onClick={
                      ()=>{
                        setSortType('genres');
                        setActiveLink('genres');
                      }
                    }
                  >
                    Genre matches
                  </Button>
                </Col>
                <Col xs={'auto'}>
                  <Button
                    className="sortButton"
                    style={activeLink === 'location' ? {
                      backgroundColor: 'inherit',
                      border: 'none',
                      color: '#f6aa1c',
                    } : {
                      backgroundColor: 'inherit',
                      border: 'none',
                    }}
                    onClick={
                      ()=>{
                        setSortType('location');
                        setActiveLink('location');
                      }
                    }
                  >
                    Location matches
                  </Button>
                </Col>
              </Row>
            </section>
            {!loading ?
              <Row className="d-flex justify-content-center mt-5">
                <Col xs={10}>
                  <UserTable sortType={sortType} user={user}/>
                </Col>
              </Row> :
              <Row className="d-flex justify-content-center">
                <Spinner animation={'border'} />
              </Row>
            }
          </> : <>
            <Row>
              <Col xs={12}>
                <h2 className="text-center p-5" id="about">About Musikantti</h2>
              </Col>
            </Row>
            <Container id="about-container" style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
              <Row>
                <Col sm={{span: 12, order: 1}} md={{span: 6, order: 1}} className="p-0">
                  <div>
                    <h3 className="text-center p-3">What is Musikantti</h3>
                    <p className="mx-5">Musikantti is all about bringing music
                      creators together. If you enjoy creating music-related
                      content, such as  playing, composing or producing music,
                      Musikantti will help you find like-minded people to
                      collaborate with.  </p>
                  </div>
                </Col>
                <Col sm={{span: 12, order: 2}} md={{span: 6, order: 2}} className="d-flex justify-content-end p-0">
                  <Image src="placeholder.jpg" className="w-100"/>
                </Col>
              </Row>
              <Row>
                <Col sm={{span: 12, order: 4}} md={{span: 6, order: 3}} className="p-0">
                  <Image src="placeholder-2.jpg" className="w-100"/>
                </Col>
                <Col sm={{span: 12, order: 3}} md={{span: 6, order: 4}} className="p-0">
                  <div>
                    <h3 className="text-center p-3">What you can do in Musikantti</h3>
                    <ul className="mx-5 list-unstyled">
                      <li className="mb-3">Create a portfolio, where you can display your music, videos and photography or illustrations.</li>
                      <li className="mb-3">Find like-minded creators recommended to you based on your region, musical skills and genre preferences. </li>
                    </ul>
                  </div>
                </Col>

              </Row>
            </Container>
          </>
        }
      </Container>
    </>
  );
}
;

export default withRouter(Home);
