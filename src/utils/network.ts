import { BitcoinNetworkType } from '../types/wallet';
import { WALLET_CONFIG } from '../config/wallet';
import { createWalletError, WalletConnectionError } from './errors';
import { RpcErrorCode } from '../types/wallet';

export const verifyNetwork = (network: BitcoinNetworkType): void => {
  if (network !== WALLET_CONFIG.expectedNetwork) {
    throw new WalletConnectionError(
      createWalletError(
        RpcErrorCode.NETWORK_MISMATCH,
        `Please switch to ${WALLET_CONFIG.expectedNetwork} network`
      )
    );
  }
};