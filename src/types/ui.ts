export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface WalletModalProps extends ModalProps {
  onSelectWallet: (provider: string) => void;
}