import * as React from 'react';

import AppProvider from './provider';

import AppContent from './content';

class App extends React.PureComponent {
  public render() {
    return (
      <AppProvider>
        <AppContent />
      </AppProvider>
    );
  }
}

export default App;
