import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';
import {useEffect, useState} from 'react';
import {useUsers} from '../hooks/ApiHooks';


const CommentRow = ({comment, deleteComment, setUpdate, update}) => {
  const [author, setAuthor] = useState(null);
  const {getUserById} = useUsers();
  console.log('comment mikä olet', comment);

  useEffect(() => {
    (async () => {
      try {
        setAuthor(await getUserById(localStorage.getItem('token'),
            comment.user_id));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);


  return (
    <>
      <Row
        className='bg-dark text-white'
        style={{
          borderBottom: '1px solid #707070',
        }}>
        <Col xs={'auto'} >
          <p>{author?.username}</p>
          <p>{comment.comment}</p>
          <p>{comment.time_added}</p>
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
