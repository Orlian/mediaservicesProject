import {Col, Container, Row} from 'react-bootstrap';
import UserRow from './UserRow';

const UserTable = () => {
  console.log('MediaArray', mediaArray);
  return (
    <Container>
      <Row>
        {
          userArray.map((item) =>
            <Col xs={12} md={6} lg={4} key={item.file_id}>
              <UserRow user={item} />
            </Col>)
        }
      </Row>
    </Container>
  );
};
export default UserTable;
