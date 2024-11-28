export enum AddressPurpose {
  Payment = 'payment',
  Ordinals = 'ordinals',
  Stacks = 'stacks'
}

export enum BitcoinNetworkType {
  Mainnet = 'mainnet',
  Testnet = 'testnet'
}

export interface WalletAddress {
  address: string;
  publicKey: string;
  purpose: AddressPurpose;
  derivationPath?: string;
}

export interface WalletState {
  isConnected: boolean;
  addresses: WalletAddress[];
  error: string | null;
  isLoading: boolean;
  network: BitcoinNetworkType | null;
}

export enum RpcErrorCode {
  USER_REJECTION = 4001,
  UNAUTHORIZED = 4100,
  UNSUPPORTED_METHOD = 4200,
  DISCONNECTED = 4900,
  CHAIN_DISCONNECTED = 4901,
  TIMEOUT = 5000,
  NETWORK_MISMATCH = 5001
}

export interface WalletError {
  code: RpcErrorCode;
  message: string;
}

export enum WalletProvider {
  Xverse = 'xverse',
  Leather = 'leather'
}