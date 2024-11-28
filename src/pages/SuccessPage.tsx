import React from 'react';
import { Navigate } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { WalletInfo } from '../components/wallet/WalletInfo';
import { useWalletContext } from '../context/WalletContext';

export const SuccessPage: React.FC = () => {
  const { isConnected, addresses } = useWalletContext();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

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
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <Bitcoin className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Successfully Connected!</h2>
            <p className="text-lg text-gray-600">
              Your Bitcoin wallet has been connected successfully
            </p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100 p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Wallet Details</h3>
            <WalletInfo addresses={addresses} />
          </div>
        </div>
      </main>
    </div>
  );
};