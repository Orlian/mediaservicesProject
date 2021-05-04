/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  Button,
  Card, Row, Col,
} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {SRLWrapper} from 'simple-react-lightbox';
import {MusicNoteBeamed, PencilSquare, Trash, Binoculars} from 'react-bootstrap-icons';
import {FaComment, FaStar} from 'react-icons/fa';
import {useComment, useUsers} from '../hooks/ApiHooks';
import {Link, withRouter} from 'react-router-dom';

const MediaRow = ({file, ownFiles, deleteMedia, update, setUpdate}) => {
  const {getUserById} = useUsers();
  const {commentArray} = useComment(true, file);
  const [owner, setOwner] = useState(null);
  console.log('MediaRow update', update);

  const genreString = JSON.parse(file.description).genres?.join(', ');


  // console.log('file.thumbnail', file);

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
  console.log('CommentCount', commentArray.length);
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
        <Card.Header className="d-flex justify-content-center p-0 m-0"
          style={{
            width: '100%',
            height: '260px',
          }}>
          {file.media_type === 'image' &&
            <SRLWrapper>
              <img src={uploadsUrl + file.filename} alt={file.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </SRLWrapper>
          }
          {file.media_type === 'video' &&
          <video src={uploadsUrl + file.filename} controls
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          }
          {file.media_type === 'audio' &&
          <audio src={uploadsUrl + file.filename} controls/>
          }
        </Card.Header>
        <Card.Body>
          <Card.Title className="mb-1">{file.title}</Card.Title>
          <div className="d-flex text-muted">
            <MusicNoteBeamed/>
            <Card.Text className="ml-2 mb-3">{genreString}</Card.Text>
          </div>
          <Card.Text>{JSON.parse(file.description).description}</Card.Text>
        </Card.Body>


        <Card.Footer >
          <Row className="justify-content-between">
            <Col xs={'auto'}>
              <div className="card-footer-end d-flex ">
                <FaComment/>
                <p className="ml-2">{commentArray.length}</p>
                <FaStar className="ml-4"/>
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
