import React, { Component } from 'react';
// import logo from './logo.svg';
import Cars from './components/cars/Cars';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
        </header> */}
        <Cars />
      </div>
    );
  }
}

export default App;
