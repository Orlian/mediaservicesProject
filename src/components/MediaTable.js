/* eslint-disable max-len */
import {useMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';
import {Col, Container, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MediaTable = ({update, ownFiles, currentUser, mediaType, setUpdate}) => {
  const {mediaArray, deleteMedia} = useMedia(update, ownFiles, currentUser);
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
        { mediaType === 'all' && mediaArrayNoAvatar?.length > 0 &&
          mediaArrayNoAvatar?.slice(0).reverse().map((item) =>
            <Col xs={12} md={6} lg={6} key={item.file_id}>
              <MediaRow file={item} ownFiles={ownFiles}
                deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
            </Col>)
        }
        { mediaType === 'all' && mediaArrayNoAvatar?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 style={{color: '#f8f8ff', fontSize: '16px'}}>No uploads found</h2>
          </Col>
        </Row>
        }
        { mediaType === 'audio' && audioArray?.length > 0 &&
        audioArray?.slice(0).reverse().map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
          </Col>)
        }
        { mediaType === 'audio' && audioArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 style={{color: '#f8f8ff', fontSize: '16px'}}>No audio uploads found</h2>
          </Col>
        </Row>
        }
        { mediaType === 'video' && videoArray?.length > 0 &&
        videoArray?.slice(0).reverse().map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
          </Col>)
        }
        { mediaType === 'video' && videoArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 style={{color: '#f8f8ff', fontSize: '16px'}}>No video uploads found</h2>
          </Col>
        </Row>
        }
        { mediaType === 'image' && imageArray?.length > 0 &&
        imageArray?.slice(0).reverse().map((item) =>
          <Col xs={12} md={6} lg={6} key={item.file_id}>
            <MediaRow file={item} ownFiles={ownFiles}
              deleteMedia={deleteMedia} update={update} setUpdate={setUpdate}/>
          </Col>)
        }
        { mediaType === 'image' && imageArray?.length === 0 &&
        <Row className="m-auto">
          <Col xs={'auto'}>
            <h2 style={{color: '#f8f8ff', fontSize: '16px'}}>No image uploads found</h2>
          </Col>
        </Row>
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
