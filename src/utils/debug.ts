import { getProviders } from 'sats-connect';
import { getXverseProviderId } from './providers';

export const logXverseProviderId = () => {
  try {
    const providerId = getXverseProviderId();
    console.log('Xverse Provider ID:', providerId);
    
    // Log all available providers for reference
    console.log('All Available Providers:', getProviders());
    
    return providerId;
  } catch (error) {
    console.error('Error getting Xverse provider ID:', error);
    return null;
  }
};