import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';

const CommentRow = ({comment, deleteComment}) => {
  return (
    <>
      <Row>
        <Col xs={'auto'} className='bg-dark text-white'>
          <h1>{comment.comment}</h1>
        </Col>
        <Col xs={'auto'}>
          <Button
            className="card-controls"
            onClick={() => {
              try {
                const conf = confirm('Do you really want to delete?');
                if (conf) {
                  deleteComment(comment.comment_id,
                      localStorage.getItem('token'));
                }
              } catch (e) {
                console.log(e.message);
              }
            }
            }
          >
            <Trash/>
          </Button>
        </Col>
      </Row>
    </>
  );
};

CommentRow.propTypes = {
  comment: PropTypes.object,
  deleteComment: PropTypes.func,
};

export default CommentRow;
