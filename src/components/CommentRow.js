import PropTypes from 'prop-types';
import {Row, Col, Button, Container} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';
import {useContext, useEffect, useState} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import moment from 'moment';
import {MediaContext} from '../contexts/MediaContext';


const CommentRow = ({comment, deleteComment, setUpdate, update}) => {
  const [author, setAuthor] = useState(null);
  const [user] = useContext(MediaContext);
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
      <Container
        className='bg-dark text-white'
        style={{
          borderBottom: '1px solid #707070',
        }}>
        <Row>
          <Col xs={'auto'} >
            <p className="mt-3 font-weight-bold">{author?.username}</p>
          </Col>
          <Col>
            <p className="mt-3">{comment.comment}</p>
          </Col>
        </Row>


        <Row>
          <Col>
            <p
              className="small text-muted mb-0">
              {moment(comment.time_added).format('HH:mm DD-MM-YYYY')}</p>
          </Col>
          {user?.user_id === author?.user_id &&
          <Col xs={'auto'}>
            <Button
              className="card-controls mb-2"
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
          }
        </Row>
      </Container>


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
