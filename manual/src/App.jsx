import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import HelloWorld from './components/hello-world';

import('http://localhost:8080/other.js').then(({fakemodule})=>{

  console.log(fakemodule)
   fakemodule.default()
})

//import('./utils').then(console.log)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <HelloWorld title="Hello from React webpack"/>;
  }
}

export default hot(module)(App);
