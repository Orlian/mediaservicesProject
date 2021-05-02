/* eslint-disable max-len */
import {Col, Container, Row} from 'react-bootstrap';
import UserRow from './UserRow';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const UserTable = ({sortType, user, input}) => {
  const {userArray} = useUsers(true, user, input);

  console.log('UserTable userArray', userArray);
  const skillsArray = userArray?.filter((item)=> {
    return user.full_name.skills?.find(
        (skill) => JSON.parse(item.full_name).skills?.includes(skill),
    );
  });

  const genresArray = userArray?.filter((item)=>{
    return user.full_name.genres?.find((genre) => JSON.parse(item.full_name).genres?.includes(genre),
    );
  });

  const locationArray = userArray?.filter((item)=>{
    return JSON.parse(item.full_name).regions === user.full_name.regions ? user.full_name.regions : false;
  });

  return (
    <Container>
      <Row>
        { sortType === 'all' &&
          userArray?.map((item) =>
            <Col xs={12} md={6} lg={4} key={item.user_id}>
              <UserRow user={item} />
            </Col>)
        }
        { sortType === 'skills' &&
        skillsArray?.map((item) =>
          <Col xs={12} md={6} lg={4} key={item.user_id}>
            <UserRow user={item} />
          </Col>)
        }
        { sortType === 'genres' &&
        genresArray?.map((item) =>
          <Col xs={12} md={6} lg={4} key={item.user_id}>
            <UserRow user={item} />
          </Col>)
        }
        { sortType === 'location' &&
        locationArray?.map((item) =>
          <Col xs={12} md={6} lg={4} key={item.user_id}>
            <UserRow user={item} />
          </Col>)
        }
      </Row>
    </Container>
  );
};

UserTable.propTypes = {
  sortType: PropTypes.string,
  user: PropTypes.object,
  input: PropTypes.string,
};

export default UserTable;
