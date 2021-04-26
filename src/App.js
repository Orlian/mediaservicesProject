import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './view/Login';
import Home from './view/Home';
import Edit from './view/Edit';
import Profile from './view/Profile';
import Single from './view/Single';
import Upload from './view/Upload';
import Logout from './view/Logout';
import {MediaProvider} from './contexts/MediaContext';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <div className="container-fluid overflow-hidden">
          <Navigation/>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/edit" component={Edit} />
            <Route path="/profile" component={Profile} />
            <Route path="/single" component={Single} />
            <Route path="/upload" component={Upload} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </MediaProvider>
    </Router>
  );
};

export default App;
