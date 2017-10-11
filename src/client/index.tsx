import * as React from 'react';

import * as ReactDOM from 'react-dom';

import App from './component/app';

function renderApp() {
  (ReactDOM as any).hydrate(
    <App />,
    document.getElementById('app'),
  );
}

window.onload = () => {
  renderApp();
};
