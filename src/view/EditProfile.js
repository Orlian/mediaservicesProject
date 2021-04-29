import UserForm from '../components/UserForm'; ;
import {Col, Row} from 'react-bootstrap';
import {MediaContext} from '../contexts/MediaContext';
import {useContext} from 'react';
import BackButton from '../components/BackButton';

const EditProfile = () => {
  const [user, setUser] = useContext(MediaContext);
  return (
    <>
      <div
        className="container-fluid"
        style={{backgroundImage: 'url(bg-image.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          position: 'relative'}}
      >
        <div
          style={{background: 'rgba(0, 0, 0, 0.4)',
            height: '100vh'}}
        >
          <Row>
            <Col xs={1} className="mt-2 ml-2">
              <BackButton/>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={4} className="mt-5 pb-5 rounded-lg"
              style={{backgroundColor: '#f8f8ff'}}>
              <UserForm user={user} setUser={setUser}/>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
