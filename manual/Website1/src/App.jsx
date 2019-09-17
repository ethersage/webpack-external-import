import React, { Component } from 'react';
import { ExternalComponent,corsImport } from 'webpack-external-import';
import HelloWorld from './components/goodbye-world';

import('moment');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    corsImport('http://localhost:3002/importManifest.js').then(() => {
      this.setState({ manifestLoaded: true });
      import(/* webpackIgnore:true */`http://localhost:3002/${window.entryManifest['website-two']['SomeExternalModule.js']}`).then(() => {
        console.log('got module, will render it in 2 seconds');
        setTimeout(() => {
          this.setState({ loaded: true });
        }, 2000);
      });
    });
  }

  renderDynamic = () => {
    const { loaded } = this.state;
    if (!loaded) return null;

    return __webpack_require__('SomeExternalModule').default();
  }

  render() {
    const { manifestLoaded } = this.state;
    if(!manifestLoaded) {
      return 'Loading...';
    }

    const helloWorldUrl = `http://localhost:3002/${window.entryManifest['website-two']['TitleComponent.js']}`;

    return (
      <div>
        <HelloWorld />
        <ExternalComponent src={helloWorldUrl} module="TitleComponent" export="Title" title="Some Heading" />
        {this.renderDynamic()}
      </div>
    );
  }
}

export default App;
