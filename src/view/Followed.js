import {Col, Container, Row} from 'react-bootstrap';
import UserTable from '../components/UserTable';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';


const Followed = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <Container fluid className="bg-dark"
        style={{
          minHeight: '100vh',
        }}
      >
        <Row className="d-flex justify-content-center pt-5">
          <Col xs={'auto'}>
            <h1 style={{
              color: '#f8f8ff',
            }}>Creators you have followed</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={10}>
            <UserTable user={user} follows={true} sortType={'all'}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default Followed;
