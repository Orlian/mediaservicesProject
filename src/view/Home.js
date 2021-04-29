/* eslint-disable max-len */
import {Col, Row} from 'react-bootstrap';
import UserTable from '../components/UserTable';

const Home = () => {
  return (
    <>
      <Row>
        <Col xs={12} className="banner"
          style={{
            backgroundImage: 'url("bg-image.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '30vh',
            position: 'relative',
          }}>Banner lål</Col>
      </Row>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs={10}>
          <UserTable />
        </Col>
      </Row>
    </>
  );
};

export default Home;
