/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  Button,
  Card, CardGroup,
  Col,
  Row,
} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';
import {CardText, MusicNoteBeamed, PencilSquare} from 'react-bootstrap-icons';
import {FaStar, FaRegComment} from 'react-icons/fa';
import {MdPageview} from 'react-icons/md';
import {useUsers} from '../hooks/ApiHooks';
import {Link, withRouter} from 'react-router-dom';

const MediaRow = ({file, ownFiles}) => {
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
      <CardGroup>
        <Card className="px-3 pb-3 pt-0 mt-5">
          <Row className="d-flex justify-content-center">
            <Col
              xs={'auto'}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: '100%',
                height: '200px',
                maxHeight: '200px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}>
              {file.media_type === 'image' &&
              <img src={file.thumbnails ? uploadsUrl + file.thumbnails.w160 : '#'} alt={file.title}
                style={{
                  width: 'auto',
                  maxHeight: '200px',
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
              <audio src={uploadsUrl + file.filename} controls
              />
              }
              <Card.ImgOverlay>
                <Card.Text
                  className="py-1 px-3"
                  style={{
                    width: 'fit-content',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    boxShadow: '2px 5px 7px #1a1c21',
                    fontWeight: '600',
                  }}
                >{owner?.username}</Card.Text>
              </Card.ImgOverlay>
            </Col>
          </Row>
          <Row>
            <Col md={{order: 'first', col: 5}} className="px-3">
              <Card.Body className="px-3">
                <Card.Title>Card title</Card.Title>
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
                <Row className="">
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
                  }
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </CardGroup>
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
};
export default withRouter(MediaRow);
