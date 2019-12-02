import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/index.js';
import RouteIndex from './route/index.js';
import {ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const store = configureStore();

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <AppContainer>
      <Provider store={store}>
        <RouteIndex/>
      </Provider>
   </AppContainer>
  </ConfigProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
