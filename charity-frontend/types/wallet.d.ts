declare module '@aptos-labs/wallet-adapter-react' {
  export interface Wallet {
    name: string;
    url: string;
    icon: string;
    connect: () => Promise<any>;
    disconnect: () => Promise<void>;
    network: () => Promise<{ name: string; url: string }>;
    account: () => Promise<{ address: string; publicKey: string | null }>;
    signAndSubmitTransaction: (transaction: any) => Promise<any>;
  }

  export function AptosWalletAdapterProvider(props: {
    plugins: Wallet[];
    autoConnect: boolean;
    children: React.ReactNode;
  }): JSX.Element;

  export function useWallet(): {
    connect: (walletName: string) => Promise<void>;
    disconnect: () => Promise<void>;
    connected: boolean;
    account: { address: string } | null;
    network: { name: string } | null;
    wallets: Wallet[];
    signAndSubmitTransaction: (transaction: any) => Promise<any>;
  };
}

declare module 'petra-plugin-wallet-adapter' {
  import { Wallet } from '@aptos-labs/wallet-adapter-react';
  export class PetraWallet implements Wallet {
    name: string;
    url: string;
    icon: string;
    connect: () => Promise<any>;
    disconnect: () => Promise<void>;
    network: () => Promise<{ name: string; url: string }>;
    account: () => Promise<{ address: string; publicKey: string | null }>;
    signAndSubmitTransaction: (transaction: any) => Promise<any>;
  }
}

declare module '@aptos-labs/wallet-adapter-core' {
  import { Wallet } from '@aptos-labs/wallet-adapter-react';
  export { Wallet };
} 