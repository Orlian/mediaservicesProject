import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="container">
        <Switch>
          <Route />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
