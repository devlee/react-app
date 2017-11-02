import * as React from 'react';

/* tslint:disable-next-line no-submodule-imports */
import { renderToString } from 'react-dom/server';

import App from '../client/component/app';

export default {
  render() {
    return renderToString(<App />);
  },
};
