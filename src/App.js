import Navigation from './Components/Navigation';
import * as buffer from "buffer";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Create from './Components/Create';
import List from './Components/List';

import './App.css';
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {

  window.Buffer = buffer.Buffer;

  return (
    <Context>
      <Router>
        <Routes>
        <Route path='/' element={<Content />} />
        </Routes>
      </Router>
    </Context>
  );
}

const Context = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          /**
           * Wallets that implement either of these standards will be available automatically.
           *
           *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
           *     (https://github.com/solana-mobile/mobile-wallet-adapter)
           *   - Solana Wallet Standard
           *     (https://github.com/solana-labs/wallet-standard)
           *
           * If you wish to support a wallet that supports neither of those standards,
           * instantiate its legacy wallet adapter here. Common legacy adapters can be found
           * in the npm package `@solana/wallet-adapter-wallets`.
           */
          // new UnsafeBurnerWalletAdapter(),
          new PhantomWalletAdapter(),
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
};

const Content = () => {

  const wallet = useAnchorWallet();

  return (
    <div className="App bg-gray-200">
      <Navigation />
      
      
        <div className="flex justify-center align-middle">
      
      </div>
    </div>
  );

}

export default App;
