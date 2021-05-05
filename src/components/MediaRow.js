/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  Button,
  Card, Row, Col,
} from 'react-bootstrap';
import {useContext, useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {SRLWrapper} from 'simple-react-lightbox';
import {MusicNoteBeamed, PencilSquare, Trash, Binoculars} from 'react-bootstrap-icons';
import {FaComment, FaStar} from 'react-icons/fa';
import {useComment, useRating, useUsers} from '../hooks/ApiHooks';
import {Link, withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import moment from 'moment';

const MediaRow = ({file, ownFiles, deleteMedia, update, setUpdate}) => {
  const {getUserById} = useUsers();
  const [user] = useContext(MediaContext);
  const {avgRating} = useRating(user, file?.file_id, update);
  const {commentArray} = useComment(true, file);
  const [owner, setOwner] = useState(null);


  const genreString = JSON.parse(file.description).genres?.join(', ');
  const options = {
    setting: {
      autoplaySpeed: 0,
      disableKeyboardControls: true,
      disableWheelControls: true,
    },
    buttons: {
      showAutoplayButton: false,
      showThumbnailsButton: false,
      showNextButton: false,
      showPrevButton: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  useEffect(() => {
    (async () => {
      try {
        setOwner(await getUserById(localStorage.getItem('token'),
            file.user_id));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <>
      <Card className="media-card"
        style={{
          textDecoration: 'none',
          color: '#f8f8ff',
          marginBottom: '2em',

        }}>
        <Card.Text className="font-weight-bold pl-3 py-2 mb-0">
          {owner?.username}</Card.Text>
        <Card.Header className="d-flex justify-content-center align-items-center p-0 m-0"
          style={{
            width: '100%',
            maxHeight: '260px',
          }}>
          {file.media_type === 'image' &&
            <SRLWrapper options={options}>
              <img src={uploadsUrl + file.filename} alt={file.title}
                style={{
                  width: '100%',
                  maxHeight: '260px',
                }}
              />
            </SRLWrapper>
          }
          {file.media_type === 'video' &&
          <video src={uploadsUrl + file.filename} controls
            style={{
              width: '100%',
              maxHeight: '260px',
              objectFit: 'cover',
            }}
          />
          }
          {file.media_type === 'audio' &&
            <div
              style={{
                height: '260px',
                width: '80%',
              }}
              className="d-flex align-items-center justify-content-center">
              <audio src={uploadsUrl + file.filename} controls/>
            </div>
          }
        </Card.Header>
        <Card.Body>
          <Card.Title className="mb-1">{file.title}</Card.Title>
          <div className="d-flex text-muted">
            <MusicNoteBeamed/>
            <Card.Text className="ml-2 mb-3">{genreString === '' ? 'No genres' : genreString}</Card.Text>
          </div>
          <Card.Text>{JSON.parse(file.description).description === '' ? 'No description' : JSON.parse(file.description).description}</Card.Text>
          <Card.Text className="text-muted">{moment(file.time_added).format('HH:mm DD-MM-YYYY')}</Card.Text>
        </Card.Body>


        <Card.Footer >
          <Row className="justify-content-between">
            <Col xs={'auto'}>
              <div className="card-footer-end d-flex ">
                <FaComment/>
                <p className="ml-2">{commentArray.length}</p>
                <FaStar className="ml-4"/>
                <p className="ml-2">{isNaN(avgRating) ? 'No ratings yet' : avgRating}</p>
              </div>
            </Col>
            <Col xs={'auto'}>
              <div className="card-footer-end">
                <Button
                  as={Link} to={
                    {
                      pathname: '/single',
                      state: file,
                    }
                  }
                  className="card-actions">
                  <Binoculars style={{
                    fontSize: '18px',
                  }}/>
                </Button>
                {ownFiles &&
                <>
                  <Button as={Link} to={
                    {
                      pathname: '/editmedia',
                      state: file,
                    }
                  }
                  className="card-actions">
                    <PencilSquare style={{
                      fontSize: '18px',
                    }}/>
                  </Button>
                  <Button
                    className="card-actions"
                    onClick={async () => {
                      try {
                        const conf = confirm('Do you really want to delete?');
                        if (conf) {
                          const response = await deleteMedia(file.file_id,
                              localStorage.getItem('token'));
                          if (response) {
                            const newUpdate = update + 1;
                            console.log('newUpdate mediaRow', newUpdate);
                            setUpdate(newUpdate);
                          }
                        }
                      } catch (e) {
                        console.log(e.message);
                      }
                    }
                    }
                  >
                    <Trash/>
                  </Button>
                </>
                }
              </div>
            </Col>
          </Row>


        </Card.Footer>

      </Card>
    </>
  );
};


MediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  deleteMedia: PropTypes.func,
  update: PropTypes.number,
  setUpdate: PropTypes.func,
};
export default withRouter(MediaRow);
