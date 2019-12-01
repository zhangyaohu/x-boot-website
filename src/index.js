import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/index.js';
import RouteIndex from './route/index.js'
import {LocaleProvider} from 'antd';

const store = configureStore();

ReactDOM.render(
  <LocaleProvider>
    <AppContainer>
       <Provider store={store}>
          <RouteIndex/>
       </Provider>
   </AppContainer>
  </LocaleProvider>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
