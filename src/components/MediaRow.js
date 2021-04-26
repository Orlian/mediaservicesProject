import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';

const MediaRow = ({file}) => {
  return (
    <>
      <Card bg={'dark'}>
        <Card.Img />
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
