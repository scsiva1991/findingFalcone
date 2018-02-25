import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './store/store';
import routes from './routes/routes';
import { render } from 'react-dom';
import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css';
import '../theme.css';
import '../app.scss';
import ReduxToastr from 'react-redux-toastr'

render(
  <Provider store={store}>
    <div>
      { routes }
      <ReduxToastr
        timeOut={4000}
        newestOnTop
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        progressBar
      />
    </div>
  </Provider>,
  document.getElementById('app')
)