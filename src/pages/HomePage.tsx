import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import { WalletButton } from '../components/WalletButton';
import { WalletModal } from '../components/WalletModal';
import { WalletProvider } from '../types/wallet';
import { useWalletContext } from '../context/WalletContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    isConnected,
    error: walletError,
    isLoading: isConnectingWallet,
    connectWallet,
    disconnectWallet,
  } = useWalletContext();

  const { isOpen, openModal, closeModal } = useModal();

  const handleConnectWallet = () => {
    if (!isConnected) {
      openModal();
    }
  };

  const handleSelectWallet = async (providerId: string) => {
    try {
      await connectWallet(providerId as WalletProvider);
      navigate('/success');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Bitcoin Connect
              </span>
            </div>
            <WalletButton
              isConnected={isConnected}
              onConnect={handleConnectWallet}
              onDisconnect={disconnectWallet}
              isLoading={isConnectingWallet}
              disabled={false}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {walletError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg">
            {walletError}
          </div>
        )}

        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Welcome to Bitcoin Connect
            </h1>
            <p className="text-lg text-gray-600">
              Click the "Connect Wallet" button in the top right to get started
            </p>
          </div>
        </div>
      </main>

      <WalletModal
        isOpen={isOpen}
        onClose={closeModal}
        onSelectWallet={handleSelectWallet}
      />
    </div>
  );
};