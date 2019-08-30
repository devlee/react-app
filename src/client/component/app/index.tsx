import * as React from 'react';

import AppProvider from './provider';

import AppContent from './content';

import * as StyleContext from 'isomorphic-style-loader/StyleContext'

const insertCss = () => '';

class App extends React.PureComponent {
  public render() {
    return (
      <StyleContext.Provider value={{ insertCss }}>
        <AppContent />
      </StyleContext.Provider>
    );
  }
}

export default App;
