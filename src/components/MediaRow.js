/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {CardText, MusicNoteBeamed, PencilSquare, Trash} from 'react-bootstrap-icons';
import {FaStar, FaRegComment} from 'react-icons/fa';
import {MdPageview} from 'react-icons/md';
import {useUsers} from '../hooks/ApiHooks';
import {Link, withRouter} from 'react-router-dom';

const MediaRow = ({file, ownFiles, deleteMedia}) => {
  const {getUserById} = useUsers();
  const [owner, setOwner] = useState(null);
  let genreString = '';

  console.log('file.description', JSON.parse(file.description).description, ownFiles);

  {JSON.parse(file.description).genres?.forEach(
      (genre) =>{
        genreString += genre + ' ';
      },
  );}

  useEffect(()=>{
    (async ()=>{
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
      <Card className="px-3 pb-3 pt-0 mt-5">
        <Row>
          <Col md={{order: 'last', col: 2}}
            className=" d-flex justify-content-md-end justify-content-center"
          >
            <Card.Img src="logo512.png" id="single-card-avatar" alt="#" className="w-75"
              style={{
                position: 'relative',
                width: 'auto',
                maxHeight: '300px',
              }}
            />
            <Card.ImgOverlay>
              <Card.Text
                style={{
                  width: 'fit-content',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}
              >{owner?.username}</Card.Text>
            </Card.ImgOverlay>
          </Col>

          <Col md={{order: 'first', col: 5}} className="px-3">
            <Card.Body className="px-3">
              <Row className="d-flex justify-content-center">
                <Col xs={'auto'}>
                  {file.media_type === 'image' &&
                  <img src={file.thumbnails ? uploadsUrl + file.thumbnails.w160 : '#'} alt={file.title}
                    style={{
                      maxWidth: '300px',
                      height: 'auto',
                    }}
                  />
                  }
                  { file.media_type === 'video' &&
                  <video src={uploadsUrl + file.filename} controls
                    style={{
                      maxWidth: '300px',
                      height: 'auto',
                    }}
                  />
                  }
                  {file.media_type === 'audio' &&
                  <audio src={uploadsUrl + file.filename} controls/>
                  }
                </Col>
              </Row>
              <Row>
                <Col xs={'auto'}>
                  <CardText/>
                </Col>
                <Col xs={'auto'}>
                  <h2 className="h6">Title:</h2>
                </Col>
                <Col xs={10} className="ml-5">
                  <p>{file.title}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={'auto'}>
                  <CardText/>
                </Col>
                <Col xs={'auto'}>
                  <h2 className="h6">Description:</h2>
                </Col>
                <Col xs={10} className="ml-5">
                  <p>{JSON.parse(file.description).description}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={'auto'}>
                  <MusicNoteBeamed/>
                </Col>
                <Col xs={'auto'}>
                  <h2 className="h6">Genres:</h2>
                </Col>
                <Col xs={'auto'} className="pl-0">
                  <p>{genreString}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={'auto'}>
                  <FaRegComment
                  />
                </Col>
                <Col xs={'auto'} className="p-0">
                  <p
                    style={{
                      padding: '0.5rem 0',
                    }}
                  >22</p>
                </Col>
                <Col xs={'auto'}>
                  <FaStar/>
                </Col>
                <Col xs={'auto'} className="p-0">
                  <p
                    style={{
                      padding: '0.5rem 0',
                    }}
                  >3,7</p>
                </Col>
                <Col xs={'auto'}>
                  <Button
                    as={Link} to={
                      {
                        pathname: '/single',
                        state: file,
                      }
                    }
                    style={{
                      backgroundColor: '#f6aa1c',
                    }}
                  >
                    <MdPageview style={{
                      color: '#161616',
                      fontSize: '18px',
                    }}/>
                  </Button>
                </Col>
                {ownFiles &&
                <>
                  <Col xs={'auto'}>
                    <Button as={Link} to={
                      {
                        pathname: '/editmedia',
                        state: file,
                      }
                    }
                    style={{
                      backgroundColor: '#f6aa1c',
                    }}
                    >
                      <PencilSquare style={{
                        color: '#161616',
                        fontSize: '18px',
                      }}/>
                    </Button>
                  </Col>
                  <Col xs={'auto'}>
                    <Button
                      style={{
                        backgroundColor: '#D11A2A',
                        color: '#161616',
                      }}
                      onClick={() => {
                        try {
                          const conf = confirm('Do you really want to delete?');
                          if (conf) {
                            deleteMedia(file.file_id,
                                localStorage.getItem('token'));
                          }
                        } catch (e) {
                          console.log(e.message);
                        }
                      }
                      }
                    >
                      <Trash/>
                    </Button>
                  </Col>
                </>
                }
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  deleteMedia: PropTypes.func,
};
export default withRouter(MediaRow);
