import PropTypes from 'prop-types';
import {Card, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const UserRow = ({user}) => {
  const {getUserAvatar} = useUsers();
  const [userAvatar, setUserAvatar] = useState({});
  useEffect(() => {
    (async () => {
      try {
        setUserAvatar(await getUserAvatar(user));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <>
      <Card bg={'dark'} className="mb-3"
        as={Link} to={
          {
            pathname: '/profile',
            state: user,
          }
        }
        style={{
          backgroundColor: '#f6aa1c',
        }}
      >
        <Card.ImgOverlay className="pt-0">
          <Row className="d-flex justify-content-center"
            style={{background: 'rgba(0, 0, 0, 0.6)'}}>
            <Card.Text className="text-light">{user.username}</Card.Text>
          </Row>
        </Card.ImgOverlay>
        {/* TODO: User avatar here */}
        <Card.Img src={uploadsUrl + userAvatar.filename}/>
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Text className="text-light">
            Skills
          </Card.Text>
          <Card.Text className="text-light">
            Location
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
UserRow.propTypes = {
  user: PropTypes.object,
};
export default UserRow;
