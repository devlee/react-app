import * as React from 'react';

/* tslint:disable-next-line no-submodule-imports */
import { renderToString } from 'react-dom/server';

import AppProvider from '../client/component/app/provider';

import AppContent from '../client/component/app/content';

import * as commonStyles from '../client/style/index.pcss';

import { AppContainer } from 'react-hot-loader';

import * as StyleContext from 'isomorphic-style-loader/StyleContext';

export default {
  render() {
    const css = [commonStyles._getCss()];
    const insertCss = (...styles) => styles.forEach((s) => css.push(s._getCss()));
    const html = renderToString(
      <AppContainer>
        <StyleContext.Provider value={{ insertCss }}>
          <AppContent />
        </StyleContext.Provider>
      </AppContainer>,
    );
    const style = css.join('');
    return {
      html,
      style,
    };
  },
};
