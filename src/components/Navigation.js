/* eslint-disable max-len */
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  InputGroup,
} from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';
import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import * as yup from 'yup';

const Navigation = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();

  const validationSchema = yup.object({
    search: yup.string().min(1).required('').matches(/^[a-zA-Z 0-9'*_.-]*$/,
        'Invalid characters'),
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        const newUser = {
          email: userData.email,
          user_id: userData.user_id,
          username: userData.username,
          full_name: JSON.parse(userData.full_name),

        };

        console.log('tuletko tästä?', userData);
        console.log('oletko objekti?', newUser);
        setUser(newUser);
      } catch (e) {
        console.log(e.message);
      }
    };
    checkUser();
  }, []);

  const doSearch = async (input) => {
    try {
      const location = {
        pathname: '/searchwait',
        state: input,
      };
      history.push(location);
    } catch (e) {
      console.error(e.message);
    }
  };


  return (
    <>
      <Navbar expand="lg" className="navbar-dark">
        <Navbar.Brand
          as={RouterLink}
          to="/"
          style={{
            paddingLeft: '1.25rem',
          }}
        >
          <img
            src="logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        {user &&
        <Formik initialValues={{search: ''}} validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            doSearch(values);
            setTimeout(() => {
              resetForm();
              setSubmitting(false);
            }, 500);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} inline
              className="mr-0 position-absolute"
              style={{
                left: '50%',
                top: '0.5rem',
                webkitTransform: 'translateX(-50%)',
                transform: 'translateX(-50%)',
              }}
            >
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search..."
                  aria-label="Search"
                  type="text"
                  name="search"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.search && errors.search ?
                    'error' : null}
                  value={values.search}
                  style={{
                    borderRadius: '0.25rem',
                  }}
                />{touched.search && errors.search ? (
                <div className="error-message">{errors.search}</div>
              ) : null}
                <InputGroup.Append>
                  <Button type="submit" className="font-weight-bold"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: '#f6aa1c',
                      color: '#161616',
                    }}
                  ><Search/></Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          )}
        </Formik>
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end w-100">


            <Nav.Link as={RouterLink} to="/">Home</Nav.Link>
            {user && <><Nav.Link as={RouterLink} to="/upload">Upload</Nav.Link>
              <Nav.Link as={RouterLink} to="/followed">Followed</Nav.Link>
              <Nav.Link as={RouterLink} to={
                {
                  pathname: '/profile',
                  state: user,
                }
              } >My Profile</Nav.Link>
            </>}
            {user ? <Nav.Link as={RouterLink} to="/logout">Logout</Nav.Link> :
              <Nav.Link as={RouterLink} to="/login">Login</Nav.Link> }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
  ;
};


Navigation.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Navigation);

