import Image from 'next/image';
import Card from './base/GenericCard';
import GenericButton from './base/GenericButton';
import PublicationCreditListing from './PublicationCreditListing';
import markImage from '../../public/markn.png';
import markInterestsImage from '../../public/mark-interests.webp';
import OpenSourceProjectsModal from './modals/OpenSourceProjectsModal';
import openSourceProjects from '../Data/open-source-projects.json';
import BlogPostsModal from './modals/BlogPostsModal';
import { useModals } from '../hooks/useModal';

export const ProfileSection = () => {
  const { isModalOpen, openModal, closeModal } = useModals(['blog', 'projects'] as const);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto items-center">
      <Image 
        src={markImage} 
        alt="Mark Nenadov - Professional headshot" 
        width={246}
        height={272}
        priority
        className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246px] rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:scale-[1.02]" 
      />

      <Image 
        src={markInterestsImage} 
        alt="Mark's interests and hobbies" 
        width={246}
        height={272}
        priority
        className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246px] rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:scale-[1.02]"
      />

      <Card title="Technical Leader">
        <div className="space-y-3">
          <p className="text-text-secondary leading-relaxed text-sm">
            I have ~24 years of full-stack engineering experience.  
            My roles have included CTO and Senior Software Developer. I&apos;m currently in the Fintech industry.
            For the curious, <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://github.com/MarkNenadov/uses">here is the tech I use</a>.
          </p> 
          <div className="flex flex-col space-y-1.5 items-center">
            <GenericButton 
              text="📝 View Blog Posts"
              shortText="Blog Posts"
              onClick={() => openModal('blog')}
              className="w-full"
            />
            {isModalOpen('blog') && (
              <BlogPostsModal onClose={() => closeModal('blog')} />
            )}
            <GenericButton 
              text="💡 Open-Source Projects"
              shortText="Projects"
              onClick={() => openModal('projects')} 
              aria-expanded={isModalOpen('projects')}
              aria-controls="open-source-projects-modal"
              className="w-full"
            />
            {isModalOpen('projects') && (
              <OpenSourceProjectsModal 
                setIsSelectedProjectsOpen={() => closeModal('projects')} 
                openSourceProjects={openSourceProjects} 
              />
            )}
          </div>
        </div>
      </Card>
      <PublicationCreditListing />
    </div>
  );
}; 