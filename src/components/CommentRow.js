import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

const CommentRow = ({comment}) => {
  return (
    <>
      <Row>
        <Col xs={'auto'} className='bg-dark text-white'>
          <h1>{comment.comment}</h1>
        </Col>
      </Row>
    </>
  );
};

CommentRow.propTypes = {
  comment: PropTypes.object,
};

export default CommentRow;
