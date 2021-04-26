/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {uploadsUrl} from '../utils/variables';

const MediaRow = ({file}) => {
  return (
    <>
      <Card bg={'dark'} className='mb-3'>
        <Card.Img src={uploadsUrl + file.thumbnails?.w320}/>
        <Card.ImgOverlay>
          <Card.Text>{file.user_id}</Card.Text>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Text className={'text-light'}>I&apos;m a goofy description lol</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
};
export default MediaRow;
