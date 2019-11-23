import React from 'react';
import Header from './components/Header'
import PlatyList from './components/PlatyList';
import AddModal from './components/AddModal';
import './App.css';

function App() {
  let platyList = [
    { sender: 'Max', text: 'A penny saved wasn\'t worth the time it took to pocket it' },
    { sender: 'Tyler', text: 'Set a man on fire, and he\'ll be warm for the rest of his life' },
    { sender: 'Max', text: 'If you give a man a dollar, he\'ll be confused why a stranger gave him money' },
    { sender: 'Tyler', text: 'If you think no one cares about your life and death, stop paying taxes' },
    { sender: 'Tyler', text: 'Set a man on fire, and he\'ll be warm for the rest of his life' },
    { sender: 'Max', text: 'If you give a man a dollar, he\'ll be confused why a stranger gave him money' },
    { sender: 'Tyler', text: 'If you think no one cares about your life and death, stop paying taxes' },
    { sender: 'Max', text: 'Can\'t go broke taking a profit' },
    { sender: 'Tyler', text: 'The definition of insanity is doing the same thing and expecting different results; So if at first you don\'t succeed: try, try again' },
    { sender: 'Tyler', text: 'Gossip is the devil\'s radio, and all good rockstars go to hell' },
  ]
  return (
    <div className="App">
      <AddModal />
      <Header />
      <PlatyList platys={platyList}/>
      <div className="footer">Icons made by <a className="inline" href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a className="inline" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
