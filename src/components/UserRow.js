/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {Card, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const UserRow = ({user}) => {
  const {getUserAvatar} = useUsers();
  const [userAvatar, setUserAvatar] = useState({});
  const userInfo = JSON.parse(user?.full_name);

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
      <Card bg={'dark'}
        as={Link} to={
          {
            pathname: '/profile',
            state: user,
          }
        }
        style={{
          backgroundColor: '#f6aa1c',
          textDecoration: 'none',
          marginBottom: '2em',
        }}
      >
        <Card.ImgOverlay className="pt-0">
          <Row className="d-flex justify-content-center"
            style={{background: 'rgba(0, 0, 0, 0.6)'}}>
            <Card.Text className="text-light">{user.username}</Card.Text>
          </Row>
        </Card.ImgOverlay>
        <Card.Img src={uploadsUrl + userAvatar.filename} style={{maxHeight: 217, objectFit: 'cover'}}/>
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Text className="text-light">
           Location: {userInfo?.regions === '' ? 'No location' : userInfo?.regions}
          </Card.Text>
          <Card.Text className="text-light">
           Skills: {userInfo?.skills.length < 1 ? 'Still learning' : userInfo?.skills.join(', ')}
          </Card.Text>
          <Card.Text className="text-light">
            Genres: {userInfo?.genres.length < 1 ? 'No genres' : userInfo?.genres.join(', ')}
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
