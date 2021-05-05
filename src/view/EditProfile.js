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
          minHeight: '100vh',
          position: 'relative'}}
      >
        <div
          style={{background: 'rgba(0, 0, 0, 0.4)',
            minHeight: '100vh'}}
        >
          <Row>
            <Col xs={1} className="mt-2 ml-2">
              <BackButton/>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            {/* eslint-disable-next-line max-len */}
            <Col xs={12} sm={10} md={8} lg={6} className="mt-5 pb-3 mb-5 rounded-lg"
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
