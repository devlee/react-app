import * as React from 'react';

import * as PropTypes from 'prop-types';

class AppProvider extends React.PureComponent<any, any> {
  public static propTypes = {
    context: PropTypes.object,
  };

  public static defaultProps = {
    context: {
      insertCss: () => '',
    },
  };

  public static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  public getChildContext() {
    return this.props.context;
  }

  public render() {
    return ((this.props.children || null) as any);
  }
}

export default AppProvider;
