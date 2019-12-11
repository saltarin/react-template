import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from '@app/src/config/redux';
import { Provider } from 'react-redux';
import { App } from '@app/src/views/view';

const root = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    {/*TODO: REACT ROUTER*/}
    <App/>
  </Provider>,
  root
);