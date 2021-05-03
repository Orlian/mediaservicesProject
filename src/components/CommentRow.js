import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';

const CommentRow = ({comment, deleteComment, setUpdate, update}) => {
  return (
    <>
      <Row>
        <Col xs={'auto'} className='bg-dark text-white'>
          <h1>{comment.comment}</h1>
        </Col>
        <Col xs={'auto'}>
          <Button
            className="card-controls"
            onClick={ async () => {
              try {
                const conf = confirm('Do you really want to delete?');
                if (conf) {
                  const response = await deleteComment(comment.comment_id,
                      localStorage.getItem('token'));
                  if (response) {
                    const newUpdate = update + 1;
                    setUpdate(newUpdate);
                  }
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
  setUpdate: PropTypes.func,
  update: PropTypes.number,
};

export default CommentRow;
