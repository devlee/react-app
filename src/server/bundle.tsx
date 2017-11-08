import * as React from 'react';

/* tslint:disable-next-line no-submodule-imports */
import { renderToString } from 'react-dom/server';

import AppProvider from '../client/component/app/provider';

import AppContent from '../client/component/app/content';

import * as commonStyles from '../client/style/index.pcss';

import { AppContainer } from 'react-hot-loader';

export default {
  render() {
    const css = [commonStyles._getCss()];
    const context = { insertCss: (...styles) => styles.forEach((s) => css.push(s._getCss())) };
    const html = renderToString(
      <AppContainer>
        <AppProvider context={context}>
          <AppContent />
        </AppProvider>
      </AppContainer>,
    );
    const style = css.join('');
    return {
      html,
      style,
    };
  },
};
