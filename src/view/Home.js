/* eslint-disable max-len */
import MediaTable from '../components/MediaTable';
import {Col, Row} from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Row>
        <Col xs={12} className={'banner'}
          style={{
            backgroundImage: 'url("bg-image.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '30vh',
            position: 'relative',
          }}>Banner lål</Col>
      </Row>
      <Row className={'d-flex justify-content-center mt-3'}>
        <Col xs={10}>
          <MediaTable/>
        </Col>
      </Row>
    </>
  );
};

export default Home;
