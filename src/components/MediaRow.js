/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {Card, Row} from 'react-bootstrap';
import {uploadsUrl} from '../utils/variables';

const MediaRow = ({file}) => {
  return (
    <>
      <Card bg={'dark'} className="mb-3">
        <Card.ImgOverlay className="pt-0">
          <Row className="d-flex justify-content-center"
            style={{background: 'rgba(0, 0, 0, 0.6)'}}>
            <Card.Text className="text-light">{file.user_id}</Card.Text>
          </Row>
        </Card.ImgOverlay>
        <Card.Img src={uploadsUrl + file.thumbnails?.w320}/>
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Text className="text-light">
            Skills
          </Card.Text>
          <Card.Text className="text-light">
            Location
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
};
export default MediaRow;
