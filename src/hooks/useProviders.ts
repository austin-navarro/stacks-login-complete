import { useState, useEffect } from 'react';
import { getProviders } from 'sats-connect';
import type { ProviderState, WalletProvider } from '../types/provider';

export const useProviders = () => {
  const [state, setState] = useState<ProviderState>({
    providers: [],
    selectedProvider: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const availableProviders = getProviders();
      setState(prev => ({
        ...prev,
        providers: availableProviders,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
        isLoading: false,
      }));
    }
  }, []);

  const selectProvider = (provider: WalletProvider) => {
    setState(prev => ({
      ...prev,
      selectedProvider: provider,
    }));
  };

  return {
    ...state,
    selectProvider,
  };
};