import React from 'react';
import type { WalletProvider } from '../types/provider';

interface ProviderListProps {
  providers: WalletProvider[];
  selectedProvider: WalletProvider | null;
  onSelectProvider: (provider: WalletProvider) => void;
}

export const ProviderList: React.FC<ProviderListProps> = ({
  providers,
  selectedProvider,
  onSelectProvider,
}) => {
  if (!providers.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No wallet providers detected
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSelectProvider(provider)}
          className={`p-4 rounded-lg border transition-all ${
            selectedProvider?.id === provider.id
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={provider.icon}
              alt={`${provider.name} icon`}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-500">Version {provider.version}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};