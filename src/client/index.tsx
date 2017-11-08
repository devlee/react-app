import * as React from 'react';

import * as ReactDOM from 'react-dom';

import './style/index.pcss';

import { AppContainer } from 'react-hot-loader';

import App from './component/app';

function renderApp(Comp) {
  ReactDOM.hydrate(
    <AppContainer warnings={false}>
      <Comp />
    </AppContainer>,
    document.getElementById('app'),
  );
}

window.onload = () => {
  renderApp(App);

  if (module.hot) {
    module.hot.accept('./component/app', () => renderApp(require('./component/app').default));
  }
};
