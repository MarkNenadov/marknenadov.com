"use client"
/* eslint-disable react/no-unescaped-entities */
import Card from './Components/base/GenericCard';
import PublicationCreditListing from './Components/PublicationCreditListing';
import SocialMediaLinks from './Components/SocialMediaLinks';
import markImage from '../public/mark.jpeg';
import markInterestsImage from '../public/mark-interests.webp';
import Image from 'next/image';
import { useState } from 'react';
import openSourceProjects from './Data/open-source-projects.json';
import OpenSourceProjectsModal from './Components/modals/OpenSourceProjectsModal';
import { AmateurNaturalistCard } from './Components/AmateurNaturalistCard';
import GenericButton from './Components/base/GenericButton';
import { BottomRightCard } from './Components/BottomRightCard';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { ProfileSection } from './Components/ProfileSection';
import { InterestsSection } from './Components/InterestsSection';

export default function Home() {
  const [isSelectedProjectsOpen, setIsSelectedProjectsOpen] = useState(false);

  return (
    <main className="min-h-[100vh] max-w-7xl md:m-3">
      <div className="flex flex-col space-y-6 p-4 md:m-4 w-full items-center">
        <Header />
        <ProfileSection />
        <InterestsSection />
        <Footer />
      </div>
    </main>
  );
}
