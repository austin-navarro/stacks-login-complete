import React, { useState } from 'react';
import { Copy, CheckCircle2, Wallet } from 'lucide-react';
import { AddressPurpose, type WalletAddress } from '../../types/wallet';

interface AddressCardProps {
  address: WalletAddress;
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAddressTitle = (purpose: AddressPurpose) => {
    switch (purpose) {
      case AddressPurpose.Payment:
        return 'BTC Address';
      case AddressPurpose.Ordinals:
        return 'BTC Address';
      case AddressPurpose.Stacks:
        return 'STX Address';
      default:
        return 'Address';
    }
  };

  const getAddressType = (purpose: AddressPurpose) => {
    switch (purpose) {
      case AddressPurpose.Payment:
        return 'p2wpkh';
      case AddressPurpose.Ordinals:
        return 'p2tr';
      case AddressPurpose.Stacks:
        return 'STX';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {getAddressTitle(address.purpose)}
        </h3>
        {getAddressType(address.purpose) && (
          <p className="text-sm text-gray-600">
            Type: {getAddressType(address.purpose)}
          </p>
        )}
      </div>
      
      <div className="relative">
        <code className="block w-full text-sm bg-gray-50 px-4 py-3 rounded-lg font-mono break-all">
          {address.address}
        </code>
        <button
          onClick={copyAddress}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
            copied
              ? 'bg-green-100 text-green-600'
              : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
          }`}
        >
          {copied ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>

      {address.derivationPath && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Account: {parseInt(address.derivationPath.split('/')[3], 10)}
          </p>
        </div>
      )}
    </div>
  );
};