"use client"
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { ProfileSection } from './Components/ProfileSection';
import { InterestsSection } from './Components/InterestsSection';

export default function Home() {
  return (
    <main className="min-h-[100vh] max-w-7xl md:m-3 bg-gradient-to-br from-surface-primary to-surface-secondary">
      <div className="flex flex-col space-y-6 p-4 md:m-4 w-full items-center animate-fade-in-up">
        <Header />
        <ProfileSection />
        <InterestsSection />
        <Footer />
      </div>
    </main>
  );
}
