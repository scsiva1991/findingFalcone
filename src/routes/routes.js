import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'; 

import App from '../containers/App';

export default (
  <Router>
    <div>
      <Route path="/" component={App} />
    </div>
  </Router>
);