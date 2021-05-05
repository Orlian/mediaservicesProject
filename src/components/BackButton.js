import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


const BackButton = ({history}) => {
  return (
    <Button
      onClick={() => {
        history.goBack();
      }}
      className="back-button mt-2 ml-2"
    >
      Back
    </Button>
  );
};

BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);
