export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  version: string;
  webUrl: string;
}

export interface ProviderState {
  providers: WalletProvider[];
  selectedProvider: WalletProvider | null;
  isLoading: boolean;
  error: string | null;
}