import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


const CancelButton = ({history}) => {
  return (
    <Button
      className="w-50 font-weight-bold"
      style={{backgroundColor: '#f8f8ff',
        color: '#161616',
        border: '1px solid #161616',
        borderRadius: '30em'}}
      onClick={() => {
        history.goBack();
      }}
    >
      CANCEL
    </Button>
  );
};


CancelButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(CancelButton);
