import React from 'react';
import PropTypes from 'prop-types';
import {ArrowLeft} from 'react-bootstrap-icons';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


const BackButton = ({history}) => {
  return (
    <Button
      onClick={() => {
        history.goBack();
      }}
    >
      <ArrowLeft/>
      Back
    </Button>
  );
};

BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);
