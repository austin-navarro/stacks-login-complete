import React from 'react';
import { Modal } from './Modal';
import type { WalletModalProps } from '../types/ui';
import { Wallet, WalletCards } from 'lucide-react';
import { WalletProvider } from '../types/wallet';

const WALLET_PROVIDERS = [
  {
    id: WalletProvider.Xverse,
    name: 'Xverse',
    description: 'Connect with Xverse Wallet',
  },
  {
    id: WalletProvider.Leather,
    name: 'Leather',
    description: 'Connect with Leather Wallet',
  },
];

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onSelectWallet,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-8">
        <div className="mx-auto w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Wallet className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Connect Wallet</h2>
        <p className="mt-2 text-gray-600">Choose your preferred wallet provider</p>
      </div>
      
      <div className="space-y-3">
        {WALLET_PROVIDERS.map((provider) => (
          <div key={provider.id} className="group relative">
            <button
              onClick={() => {
                onSelectWallet(provider.id);
                onClose();
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50/50 transition-all group-hover:shadow-sm"
            >
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm overflow-hidden">
                <WalletCards className="w-8 h-8 text-orange-500 transition-all group-hover:scale-110" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-medium text-gray-900">{provider.name}</h3>
                <p className="text-sm text-gray-500">{provider.description}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        New to Bitcoin wallets?{' '}
        <a
          href="https://bitcoin.org/en/choose-your-wallet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-orange-600"
        >
          Learn more about wallets
        </a>
      </p>
    </Modal>
  );
};