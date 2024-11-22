import { Inter } from 'next/font/google';
import './globals.css';
import { measureWebVitals, reportPerformanceMetric } from '@/lib/monitoring';
import DebugPanel from '@/components/debug/DebugPanel';

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
  // Initialize performance monitoring
  if (typeof window !== 'undefined') {
    measureWebVitals((metric) => {
      reportPerformanceMetric(metric);
    });
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <DebugPanel />
      </body>
    </html>
  );
}
