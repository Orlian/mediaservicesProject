/* eslint-disable max-len */
import MediaTable from '../components/MediaTable';
import {Container, Col, Row, Button, Image} from 'react-bootstrap';
import UserTable from '../components/UserTable';
import {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useUsers} from '../hooks/ApiHooks';
import {Link, withRouter} from 'react-router-dom';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();

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


  return (
    <>
      <Container fluid className="bg-dark home-container pb-5">
        <Row>
          <Col xs={12} className="banner"
            style={{
              backgroundImage: 'url("bg-image.jpg")',
              backgroundPosition: 'center',
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
                <h2>Collaboration platform for musicians</h2>
              </div>
              <div>
                {user ?
                  <Button
                    className="mt-5 banner-btn px-5 py-2"
                    href="#home-cards-area"
                  >DISCOVER
                  </Button> : <Button
                    className="mt-5 banner-btn px-5 py-2"
                    as={Link} to={
                      {
                        pathname: '/login',
                      }
                    }>
                    REGISTER
                  </Button>}
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
            <Row className="d-flex justify-content-center mt-5">
              <Col xs={10}>
                <MediaTable ownFiles={false}/>
                <UserTable/>
              </Col>
            </Row>
          </> : <>
            <Row>
              <Col xs={12}>
                <h2 className="text-center p-5">About Musikantti</h2>
              </Col>
            </Row>
            <Container style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
              <Row>
                <Col xs={6} className="d-flex justify-content-end p-0">
                  <Image src="bg-image.jpg" className="w-100"/>
                </Col>
                <Col xs={6} className="p-0">
                  <div>
                    <h3 className="text-center p-3">About Musikantti</h3>
                    <p className="ml-5"></p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} className="p-0">
                  <div>
                    <h3 className="text-center p-3">Title</h3>
                    <p className="ml-5"></p>
                  </div>
                </Col>
                <Col xs={6} className="p-0">
                  <Image src="bg-image.jpg" className="w-100"/>
                </Col>
              </Row>
            </Container>
          </>
        }
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={10}>
            <UserTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}
;

export default withRouter(Home);
