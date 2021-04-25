import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {useState} from 'react';
import {Button} from 'react-bootstrap';

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
          { toggle ? <LoginForm/> : <RegisterForm setToggle={setToggle}/> }
          <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}
          </Button>
        </div>
      </div>
    </>
  );
};


export default Login;
