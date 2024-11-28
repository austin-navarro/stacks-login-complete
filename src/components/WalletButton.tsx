import React from 'react';
import { Wallet, Loader2 } from 'lucide-react';

interface WalletButtonProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={isConnected ? onDisconnect : onConnect}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
        ${
          isConnected
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }
        ${(disabled || isLoading) && 'opacity-50 cursor-not-allowed'}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Wallet className="w-5 h-5" />
      )}
      <span>{isConnected ? 'Connected' : 'Connect Wallet'}</span>
    </button>
  );
}