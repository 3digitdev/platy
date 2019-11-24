import React from 'react';
import Header from './components/Header'
import PlatyList from './components/PlatyList';
import AddModal from './components/AddModal';
import './App.css';

function App() {
  return (
    <div className="App">
      <AddModal />
      <Header />
      <PlatyList />
      <div className="footer">Icons made by <a className="inline" href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a className="inline" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
