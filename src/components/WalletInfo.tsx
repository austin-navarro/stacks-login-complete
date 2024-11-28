import React, { useState } from 'react';
import { Copy, CheckCircle2, Wallet } from 'lucide-react';
import type { WalletAddress, AddressPurpose } from '../types/wallet';

interface WalletInfoProps {
  addresses: WalletAddress[];
}

const AddressCard: React.FC<{ address: WalletAddress }> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPurposeLabel = (purpose: AddressPurpose) => {
    switch (purpose) {
      case AddressPurpose.Payment:
        return 'Payment Address';
      case AddressPurpose.Ordinals:
        return 'Ordinals Address';
      case AddressPurpose.Stacks:
        return 'Stacks Address';
      default:
        return 'Unknown Address';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-orange-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {getPurposeLabel(address.purpose)}
          </h3>
        </div>
        <button
          onClick={copyAddress}
          className={`p-2 rounded-full transition-colors ${
            copied
              ? 'bg-green-100 text-green-600'
              : 'hover:bg-orange-100 text-gray-400 hover:text-orange-600'
          }`}
        >
          {copied ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Address</div>
          <code className="block w-full text-sm bg-orange-50 px-4 py-3 rounded-lg font-mono break-all">
            {address.address}
          </code>
        </div>
        {address.publicKey && (
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Public Key</div>
            <code className="block w-full text-sm bg-gray-50 px-4 py-3 rounded-lg font-mono break-all">
              {address.publicKey}
            </code>
          </div>
        )}
        {address.derivationPath && (
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Derivation Path</div>
            <code className="block w-full text-sm bg-gray-50 px-4 py-3 rounded-lg font-mono">
              {address.derivationPath}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

export const WalletInfo: React.FC<WalletInfoProps> = ({ addresses }) => {
  if (!addresses.length) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <div className="text-sm font-medium text-gray-500">
          Connected Addresses: {addresses.length}
        </div>
      </div>
      {addresses.map((address) => (
        <AddressCard key={address.address} address={address} />
      ))}
    </div>
  );
};