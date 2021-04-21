import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="container-fluid">
        <Navigation/>
        <Switch>
          <Route />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
