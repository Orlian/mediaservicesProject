import {useMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';
import {Col, Container, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MediaTable = ({ownFiles}) => {
  const {mediaArray, deleteMedia} = useMedia(true, ownFiles);
  console.log('MediaArray', mediaArray);
  return (
    <Container>
      <Row>
        {
          mediaArray.map((item) =>
            <Col xs={12} md={6} lg={6} key={item.file_id}>
              <MediaRow file={item} ownFiles={ownFiles}
                deleteMedia={deleteMedia}/>
            </Col>)
        }
      </Row>
    </Container>
  );
};

MediaTable.propTypes = {
  ownFiles: PropTypes.bool,
};


export default MediaTable;
