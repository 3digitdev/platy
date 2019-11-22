import React from 'react';
import logo from './platypus.svg';
import './App.css';

function App() {
  return (
    <div className="App content">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1>Platy</h1>
        <h6><em>Share Empty Platytudes</em></h6>
      </header>
    </div>
  );
}

export default App;
