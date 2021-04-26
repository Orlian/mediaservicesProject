import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {baseUrl} from '../utils/variables';

const MediaRow = ({file}) => {
  return (
    <>
      <Card bg={'dark'}>
        <Card.Img src={baseUrl + 'media/' + file.file_id}/>
        <Card.ImgOverlay>
          <Card.Text>Username</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
};
export default MediaRow;
