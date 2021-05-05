/* eslint-disable max-len */
import {Col, Container, Row} from 'react-bootstrap';
import UserRow from './UserRow';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const UserTable = ({sortType, user, input, follows}) => {
  const {userArray} = useUsers(true, user, input, follows);

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
        { sortType === 'all' && userArray?.length>0 &&
          userArray?.map((item) =>
            <Col xs={12} md={6} lg={4} key={item.user_id}>
              <UserRow user={item} />
            </Col>)
        }
        { sortType === 'all' && userArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 className="h-5" style={{color: '#f8f8ff'}}>No user matches found</h2>
          </Col>
        </Row>
        }
        { sortType === 'skills' && skillsArray?.length > 0 &&
        skillsArray?.map((item) =>
          <Col xs={12} md={6} lg={4} key={item.user_id}>
            <UserRow user={item} />
          </Col>)
        }
        { sortType === 'skills' && skillsArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 className="h-5" style={{color: '#f8f8ff'}}>No skills matches found</h2>
          </Col>
        </Row>
        }
        { sortType === 'genres' && genresArray?.length > 0 &&
        genresArray?.map((item) =>
          <Col xs={12} md={6} lg={4} key={item.user_id}>
            <UserRow user={item} />
          </Col>)
        }
        { sortType === 'genres' && genresArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 className="h-5" style={{color: '#f8f8ff'}}>No genre matches found</h2>
          </Col>
        </Row>
        }
        { sortType === 'location' && locationArray?.length > 0 &&
        locationArray?.map((item) =>
          <Col xs={12} md={6} lg={4} key={item.user_id}>
            <UserRow user={item} />
          </Col>)
        }
        { sortType === 'location' && locationArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 className="h-5" style={{color: '#f8f8ff'}}>No location matches found</h2>
          </Col>
        </Row>
        }
      </Row>
    </Container>
  );
};

UserTable.propTypes = {
  sortType: PropTypes.string,
  user: PropTypes.object,
  input: PropTypes.string,
  follows: PropTypes.bool,
};

export default UserTable;
