import React from 'react';
import ConnectWallet from './components/connectWallet';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>Solana Examples</h1>
      <hr className="fullWidth" />

      <p>Hello there</p>
      <ConnectWallet/>

    </header>
  </div>
  );
}

export default App;
