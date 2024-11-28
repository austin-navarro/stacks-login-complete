import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '../hooks/useWallet';
import type { WalletAddress, WalletProvider } from '../types/wallet';

interface WalletContextType {
  isConnected: boolean;
  addresses: WalletAddress[];
  error: string | null;
  isLoading: boolean;
  connectWallet: (provider?: WalletProvider) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};