import { request } from 'sats-connect';
import { AddressPurpose, RpcErrorCode, WalletAddress, WalletProvider } from '../types/wallet';
import { WALLET_CONFIG } from '../config/wallet';
import { createWalletError, WalletConnectionError } from './errors';
import { verifyNetwork } from './network';
import { getLeatherProvider } from './providers';

export const connectWithTimeout = async (
  provider: WalletProvider,
  timeoutMs = WALLET_CONFIG.connectionTimeout
): Promise<WalletAddress[]> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(
        new WalletConnectionError(
          createWalletError(
            RpcErrorCode.TIMEOUT,
            'Connection attempt timed out'
          )
        )
      );
    }, timeoutMs);
  });

  try {
    const connectPromise = provider === WalletProvider.Leather
      ? handleLeatherConnect()
      : handleXverseConnect();

    const result = await Promise.race([connectPromise, timeoutPromise]);
    return result;
  } catch (error) {
    console.error('Connection error:', error);
    if (error instanceof WalletConnectionError) {
      throw error;
    }
    throw new WalletConnectionError(
      createWalletError(
        RpcErrorCode.DISCONNECTED,
        'Failed to connect to wallet'
      )
    );
  }
};

const handleXverseConnect = async (): Promise<WalletAddress[]> => {
  try {
    const response = await request('wallet_connect', {
      message: WALLET_CONFIG.connectMessage,
      addresses: [
        AddressPurpose.Payment,
        AddressPurpose.Ordinals,
        AddressPurpose.Stacks,
      ],
    });

    if (!response || response.status === 'error') {
      console.error('Xverse connection error:', response?.error);
      
      if (response?.error?.code === RpcErrorCode.USER_REJECTION) {
        throw new WalletConnectionError(
          createWalletError(
            RpcErrorCode.USER_REJECTION,
            'Connection request was rejected'
          )
        );
      }

      throw new WalletConnectionError(
        createWalletError(
          RpcErrorCode.DISCONNECTED,
          'Failed to connect to Xverse wallet'
        )
      );
    }

    if (response.result.network) {
      verifyNetwork(response.result.network);
    }

    return response.result.addresses.map((addr: any) => ({
      address: addr.address,
      publicKey: addr.publicKey,
      purpose: addr.purpose as AddressPurpose,
      derivationPath: addr.derivationPath,
    }));
  } catch (error) {
    console.error('Unexpected error during Xverse connection:', error);
    
    if (error instanceof WalletConnectionError) {
      throw error;
    }

    throw new WalletConnectionError(
      createWalletError(
        RpcErrorCode.DISCONNECTED,
        'Unable to connect to Xverse wallet. Please try again.'
      )
    );
  }
};

const handleLeatherConnect = async (): Promise<WalletAddress[]> => {
  const provider = getLeatherProvider();
  
  if (!provider) {
    throw new WalletConnectionError(
      createWalletError(
        RpcErrorCode.DISCONNECTED,
        'Leather wallet not found. Please install Leather wallet extension.'
      )
    );
  }

  try {
    const response = await provider.request("getAddresses");

    if (!response?.result?.addresses) {
      throw new WalletConnectionError(
        createWalletError(
          RpcErrorCode.DISCONNECTED,
          'Failed to get addresses from Leather wallet'
        )
      );
    }

    return response.result.addresses.map((addr: any) => ({
      address: addr.address,
      publicKey: addr.publicKey,
      purpose: addr.purpose as AddressPurpose,
      derivationPath: addr.derivationPath,
    }));
  } catch (error) {
    console.error('Error connecting to Leather wallet:', error);
    throw new WalletConnectionError(
      createWalletError(
        RpcErrorCode.DISCONNECTED,
        'Failed to connect to Leather wallet'
      )
    );
  }
};