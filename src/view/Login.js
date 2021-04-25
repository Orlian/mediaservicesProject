import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{backgroundImage: 'url(bg-image.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          position: 'relative'}}
      >
        <div
          style={{background: 'rgba(0, 0, 0, 0.4)',
            height: '100vh'}}
        >
          <Row className="d-flex justify-content-center">
            <Col lg={4} className="mt-5 pb-5 rounded-lg"
              style={{backgroundColor: '#f8f8ff'}}>
              { toggle ? <LoginForm/> : <RegisterForm setToggle={setToggle}/> }
              <div className="d-flex justify-content-center">
                <Button onClick={showHide}
                  className="w-50 outline-button"
                >{toggle ? 'REGISTER' : 'LOGIN'}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};


export default Login;
