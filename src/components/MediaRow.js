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
import {CardText, MusicNoteBeamed, PencilSquare} from 'react-bootstrap-icons';
import {FaStar, FaRegComment} from 'react-icons/fa';
import {MdPageview} from 'react-icons/md';
import {useUsers} from '../hooks/ApiHooks';

const MediaRow = ({file, ownFiles}) => {
  const {getUserById} = useUsers();
  const [owner, setOwner] = useState(null);
  let genreString = '';

  console.log('file.description', JSON.parse(file.description).description);

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
      <Card
        style={{
          border: '1px solid #f8f8ff',
          backgroundColor: '#161616',
          color: '#f8f8ff',
        }}
      >
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
                  <img src={file.thumbnails ? uploadsUrl + file.thumbnails.w160 : '#'} alt={file.title}
                    style={{
                      maxWidth: '300px',
                      height: 'auto',
                    }}
                  />
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
                  <Button
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
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
};
export default MediaRow;
