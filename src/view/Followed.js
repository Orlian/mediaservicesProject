import {Col, Container, Row} from 'react-bootstrap';
import UserTable from '../components/UserTable';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';


const Followed = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={10}>
            <UserTable user={user}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default Followed;
