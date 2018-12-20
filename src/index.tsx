import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { App } from './components/App';

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route component={App}></Route>
      <DevTools />
    </React.Fragment>
  </Router>,
  document.getElementById('root'));
