import { useState, useCallback, useEffect } from 'react';
import type { WalletState, WalletAddress, RpcErrorCode, WalletProvider } from '../types/wallet';
import { connectWithTimeout } from '../utils/wallet-connection';
import { WalletConnectionError } from '../utils/errors';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    addresses: [],
    error: null,
    isLoading: false,
    network: null,
  });

  const [provider, setProvider] = useState<WalletProvider | null>(null);

  // Try to restore wallet connection from localStorage
  useEffect(() => {
    const savedWalletData = localStorage.getItem('walletData');
    if (savedWalletData) {
      try {
        const { provider: savedProvider, addresses } = JSON.parse(savedWalletData);
        if (savedProvider && addresses) {
          setProvider(savedProvider);
          setWalletState({
            isConnected: true,
            addresses,
            error: null,
            isLoading: false,
            network: null,
          });
        }
      } catch (error) {
        console.error('Error restoring wallet connection:', error);
        localStorage.removeItem('walletData');
      }
    }
  }, []);

  const connectWallet = useCallback(async (selectedProvider?: WalletProvider) => {
    const providerToUse = selectedProvider || provider;
    
    if (!providerToUse) {
      setWalletState(prev => ({
        ...prev,
        error: 'No wallet provider selected.',
      }));
      return;
    }

    setWalletState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const addresses = await connectWithTimeout(providerToUse);
      setProvider(providerToUse);
      
      // Save wallet data to localStorage
      localStorage.setItem('walletData', JSON.stringify({
        provider: providerToUse,
        addresses,
      }));

      setWalletState({
        isConnected: true,
        addresses,
        error: null,
        isLoading: false,
        network: null,
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
      const walletError = error instanceof WalletConnectionError
        ? error
        : new WalletConnectionError({
            code: RpcErrorCode.DISCONNECTED,
            message: 'Failed to connect wallet',
          });

      setWalletState(prev => ({
        ...prev,
        error: walletError.message,
        isLoading: false,
        isConnected: false,
        addresses: [],
      }));
    }
  }, [provider]);

  const disconnectWallet = useCallback(() => {
    localStorage.removeItem('walletData');
    setWalletState({
      isConnected: false,
      addresses: [],
      error: null,
      isLoading: false,
      network: null,
    });
    setProvider(null);
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    selectedProvider: provider,
  };
};