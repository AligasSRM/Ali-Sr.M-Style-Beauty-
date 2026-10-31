import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { CartProvider } from '@/components/CartProvider';

export const metadata: Metadata = {
  title: 'Ali Sr.M – Style & Beauty',
  description: 'A fashion and beauty marketplace MVP built for AI styling and modern commerce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
