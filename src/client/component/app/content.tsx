import * as React from 'react';

import * as styles from './style.pcss';

/* tslint:disable-next-line no-submodule-imports */
import * as withStyles from 'isomorphic-style-loader/withStyles';

@withStyles(styles)
class AppContent extends React.PureComponent {
  public render() {
    return (
      <div className={styles.root}>hello world</div>
    );
  }
}

export default AppContent;
