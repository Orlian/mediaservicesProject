import {Col, Container, Row} from 'react-bootstrap';
import UserTable from '../components/UserTable';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import PropTypes from 'prop-types';

const Search = ({location}) => {
  const [user] = useContext(MediaContext);
  const input = location.state;

  console.log(input);

  return (
    <>
      <Container fluid className="bg-dark"
        style={{
          minHeight: '100vh',
        }}>
        <Row className="d-flex justify-content-center pt-5">
          <Col xs={'auto'}>
            <h1 className="h3" style={{
              color: '#f8f8ff',
              textAlign: 'center',
            }}>Search results for {input}</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={10}>
            <UserTable user={user} input={input} sortType={'all'}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Search.propTypes = {
  location: PropTypes.object,
};

export default Search;
