/* eslint-disable max-len */
import {Col, Container, Row} from 'react-bootstrap';
import UserRow from './UserRow';
import {useUsers} from '../hooks/ApiHooks';

const UserTable = () => {
  const {userArray} = useUsers();
  console.log('userArray', userArray);
  return (
    <Container>
      <Row>
        {
          userArray?.map((item) =>
            <Col xs={12} md={6} lg={4} key={item.user_id}>
              <UserRow user={item} />
            </Col>)
        }
      </Row>
    </Container>
  );
};
export default UserTable;
