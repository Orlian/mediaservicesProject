/* eslint-disable max-len */
import {Col, Row} from 'react-bootstrap';
import CommentRow from './CommentRow';
import {useComment} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const CommentTable = ({file}) => {
  const {commentArray, deleteComment} = useComment(true, file);
  console.log('commentArray', commentArray);
  return (
    <div style={{
      width: '100%',
      height: '400px',
    }}>
      <Row>
        {
          commentArray?.map((item) =>
            <Col xs={12} key={item.comment_id}>
              <CommentRow comment={item} deleteComment={deleteComment}/>
            </Col>)
        }
      </Row>
    </div>
  );
};

CommentTable.propTypes = {
  file: PropTypes.object,
};


export default CommentTable;
