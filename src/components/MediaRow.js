import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';

const MediaRow = ({file}) => {
  return (
    <>
      <Card>
        <Card.ImgOverlay></Card.ImgOverlay>
      </Card>
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
};
export default MediaRow;
