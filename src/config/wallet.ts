import { BitcoinNetworkType } from '../types/wallet';

export const WALLET_CONFIG = {
  expectedNetwork: BitcoinNetworkType.Mainnet,
  connectionTimeout: 30000, // 30 seconds
  connectMessage: 'Connect to Bitcoin Wallet',
} as const;