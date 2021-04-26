import {useMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';
import {Col, Container, Row} from 'react-bootstrap';

const MediaTable = () => {
  const {mediaArray} = useMedia(true);
  console.log('MediaArray', mediaArray);
  return (
    <Container>
      <Row>
        {
          mediaArray.map((item) =>
            <Col xs={12} md={6} lg={4} key={item.file_id}>
              <MediaRow file={item} />
            </Col>)
        }
      </Row>
    </Container>
  );
};
export default MediaTable;
