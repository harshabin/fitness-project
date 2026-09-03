import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { RestTimerModal } from '@/components/ui/RestTimerModal';

export const metadata: Metadata = {
  title: 'FitHealth — Biomechanical Fitness & Health Platform',
  description: 'Structured 7-day workout body-part splits, personalized nutrition engine, and interactive 2D anatomical muscle activation maps.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070A0E] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-crimson selection:text-white">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
            {children}
          </main>
        </div>
        <RestTimerModal />
      </body>
    </html>
  );
}
