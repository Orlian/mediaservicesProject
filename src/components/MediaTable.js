import {useMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';
import {Col, Container, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MediaTable = ({update, ownFiles, currentUser, mediaType}) => {
  const {mediaArray, deleteMedia} = useMedia(update, ownFiles, currentUser);
  console.log('MediaArray', mediaArray);
  console.log('CurrentUser', currentUser);
  const mediaArrayNoAvatar = mediaArray.filter((item) => {
    return item.description.includes('description');
  });

  const audioArray = mediaArrayNoAvatar?.filter((file)=>{
    return file.media_type === 'audio';
  });

  const videoArray = mediaArrayNoAvatar?.filter((file)=>{
    return file.media_type === 'video';
  });

  const imageArray = mediaArrayNoAvatar?.filter((file)=>{
    return file.media_type === 'image';
  });

  return (
    <Container>
      <Row>
        { mediaType === 'all' &&
          mediaArrayNoAvatar?.map((item) =>
            <Col xs={12} md={6} lg={6} key={item.file_id}>
              <MediaRow file={item} ownFiles={ownFiles}
                deleteMedia={deleteMedia}/>
            </Col>)
        }
        { mediaType === 'audio' &&
        audioArray?.map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia}/>
          </Col>)
        }
        { mediaType === 'video' &&
        videoArray?.map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia}/>
          </Col>)
        }
        { mediaType === 'image' &&
        imageArray?.map((item) =>
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
  update: PropTypes.bool,
  ownFiles: PropTypes.bool,
  currentUser: PropTypes.object,
  mediaType: PropTypes.string,
};


export default MediaTable;
