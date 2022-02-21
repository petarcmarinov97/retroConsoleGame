import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import GameBoy from './components/GameBoy';
function App() {

  return (
    <>
      <GameBoy gameTitle="Tetris" />
    </>
  );
}

export default App;
