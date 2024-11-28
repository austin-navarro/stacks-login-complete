import { getProviders, getProviderById } from 'sats-connect';
import { WalletProvider } from '../types/wallet';

export const getXverseProviderId = () => {
  const providers = getProviders();
  const xverseProvider = providers.find(provider => 
    provider.name.toLowerCase().includes('xverse')
  );
  
  if (!xverseProvider) {
    throw new Error('Xverse wallet not found. Please install Xverse wallet extension.');
  }
  
  return xverseProvider.id;
};

export const getXverseProvider = () => {
  const providerId = getXverseProviderId();
  return getProviderById(providerId);
};

export const getLeatherProvider = () => {
  return window.LeatherProvider;
};

export const accountFromDerivationPath = (path: string) => {
  const segments = path.split("/");
  const account = parseInt(segments[3].replaceAll("'", ""), 10);
  if (isNaN(account)) throw new Error("Cannot parse account number from path");
  return account;
};