import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, Config, DAppProvider } from '@usedapp/core';
import App from './App';
import reportWebVitals from './reportWebVitals';

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/8e94bdb1c0a34f7d9f4d9c9a849f0db2',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <Router>
        <App />
      </Router>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
