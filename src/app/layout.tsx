import { Inter } from 'next/font/google';
import './globals.css';
import { measureWebVitals } from '@/lib/monitoring';
import DebugPanel from '@/components/debug/DebugPanel';
import { AuthProvider } from '@/lib/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StartupSpark',
  description: 'Your AI-powered startup advisor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <DebugPanel />
        </AuthProvider>
      </body>
    </html>
  );
}
