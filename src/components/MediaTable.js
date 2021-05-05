/* eslint-disable max-len */
import {useMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';
import {Col, Container, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MediaTable = ({update, ownFiles, currentUser, mediaType, setUpdate}) => {
  const {mediaArray, deleteMedia} = useMedia(update, ownFiles, currentUser);
  console.log('MediaArray', mediaArray);
  console.log('CurrentUser', currentUser);
  console.log('MediaTable update', update);
  const mediaArrayNoAvatar = mediaArray?.filter((item) => {
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
          mediaArrayNoAvatar?.slice(0).reverse().map((item) =>
            <Col xs={12} md={6} lg={6} key={item.file_id}>
              <MediaRow file={item} ownFiles={ownFiles}
                deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
            </Col>)
        }
        { mediaType === 'audio' &&
        audioArray?.slice(0).reverse().map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
          </Col>)
        }
        { mediaType === 'video' &&
        videoArray?.slice(0).reverse().map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
          </Col>)
        }
        { mediaType === 'image' &&
        imageArray?.slice(0).reverse().map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
          </Col>)
        }
      </Row>
    </Container>
  );
};

MediaTable.propTypes = {
  update: PropTypes.number,
  ownFiles: PropTypes.bool,
  currentUser: PropTypes.object,
  mediaType: PropTypes.string,
  setUpdate: PropTypes.func,
};


export default MediaTable;
