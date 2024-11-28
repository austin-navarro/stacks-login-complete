import { RpcErrorCode, WalletError } from '../types/wallet';

export class WalletConnectionError extends Error {
  code: RpcErrorCode;

  constructor(error: WalletError) {
    super(error.message);
    this.code = error.code;
    this.name = 'WalletConnectionError';
  }
}

export const createWalletError = (
  code: RpcErrorCode,
  message: string
): WalletError => ({
  code,
  message,
});