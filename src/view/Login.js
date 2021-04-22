import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const Login = () => {
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
        <div style={{background: 'rgba(0, 0, 0, 0.4)',
          height: '100vh'}}>
          <RegisterForm></RegisterForm>
          <LoginForm></LoginForm>
        </div>

      </div>

    </>
  );
};


export default Login;
