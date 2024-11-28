import React from 'react';
import { AddressCard } from './AddressCard';
import type { WalletAddress } from '../../types/wallet';

interface WalletInfoProps {
  addresses: WalletAddress[];
}

export const WalletInfo: React.FC<WalletInfoProps> = ({ addresses }) => {
  if (!addresses.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No wallet addresses found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {addresses.map((address) => (
        <AddressCard key={address.address} address={address} />
      ))}
    </div>
  );
};