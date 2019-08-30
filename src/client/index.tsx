import * as React from 'react';

import * as ReactDOM from 'react-dom';

import './style/index.pcss';

import { AppContainer } from 'react-hot-loader';

import App from './component/app';

function renderApp(Comp) {
  ReactDOM.hydrate(
    <AppContainer>
      <Comp />
    </AppContainer>,
    document.getElementById('app'),
  );
}

window.onload = () => {
  renderApp(App);

  if (module.hot) {
    let hmrKey;
    /* tslint:disable no-submodule-imports */
    const hotClient = require('webpack-hot-middleware/client');
    hotClient.subscribe((e) => {

      if (e.action === 'bundled') {
        if (hmrKey && (hmrKey !== e.hmrKey)) {
          window.location.reload();
        } else {
          hmrKey = e.hmrKey;
        }
      }
    });
    module.hot.accept('./component/app', () => renderApp(require('./component/app').default));
  }
};
