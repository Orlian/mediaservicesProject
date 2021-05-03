import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


const SearchWait = ({location}) => {
  console.log('location.state', location.state.search);
  return (
    <Redirect to={{pathname: '/search', state: location.state.search}}/>
  );
};

SearchWait.propTypes = {
  location: PropTypes.object,
};

export default SearchWait;
