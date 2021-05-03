import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './view/Login';
import Home from './view/Home';
import EditProfile from './view/EditProfile';
import Profile from './view/Profile';
import Single from './view/Single';
import Upload from './view/Upload';
import Logout from './view/Logout';
import {MediaProvider} from './contexts/MediaContext';
import EditMedia from './view/EditMedia';
import Search from './view/Search';
import Followed from './view/Followed';
import SearchWait from './view/SearchWait';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <div className="container-fluid overflow-hidden">
          <Navigation/>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/profile" component={Profile} />
            <Route path="/single" component={Single} />
            <Route path="/upload" component={Upload} />
            <Route path="/logout" component={Logout} />
            <Route path="/editmedia" component={EditMedia} />
            <Route path="/search" component={Search}/>
            <Route path="/followed" component={Followed}/>
            <Route path="/searchwait" component={SearchWait} />
          </Switch>
        </div>
      </MediaProvider>
    </Router>
  );
};

export default App;
