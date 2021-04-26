import BackButton from '../components/BackButton';
import {Card, Col, Container, Row} from 'react-bootstrap';


const Single = () => {
  return (
    <Container fluid>
      <Row className="my-4">
        <Col xs={4} md={2} className="d-flex justify-content-center">
          <BackButton />
        </Col>
        <Col xs={8} md={10}>
          <h2 className="h2" id="single-title">Title</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col xs={8}>
          <Card bg={'dark'}>
            <Card.Img style={{height: 200, width: 200}} src="https://placekitten.com/300/300" alt="kitten"/>
            <Card.ImgOverlay>
              <Card.Text>Username</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Single;
