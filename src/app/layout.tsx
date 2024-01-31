import Navbar from '@/components/Navbar';
import '@/styles/_globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shelf Esteem',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <Navbar />
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
