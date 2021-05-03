/* eslint-disable max-len */
import {Col, Row} from 'react-bootstrap';
import CommentRow from './CommentRow';
import {useComment} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const CommentTable = ({file, update, setUpdate}) => {
  const {commentArray, deleteComment} = useComment(update, file);
  console.log('commentArray ja update', commentArray, update);
  return (
    <div style={{
      width: '100%',
      height: '100%',
    }}>
      <Row>
        {
          commentArray?.map((item) =>
            <Col xs={12} key={item.comment_id}>
              <CommentRow comment={item} deleteComment={deleteComment} setUpdate={setUpdate} update={update}/>
            </Col>)
        }
      </Row>
    </div>
  );
};

CommentTable.propTypes = {
  file: PropTypes.object,
  update: PropTypes.number,
  setUpdate: PropTypes.func,
};


export default CommentTable;
