import * as React from 'react';

import * as styles from './style.pcss';

/* tslint:disable-next-line no-submodule-imports */
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Pc from '../p';

@withStyles(styles)
class AppContent extends React.PureComponent {
  public render() {
    return (
      <div className={styles.root}><Pc /></div>
    );
  }
}

export default AppContent;
