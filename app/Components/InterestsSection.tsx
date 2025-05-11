import { AmateurNaturalistCard } from './AmateurNaturalistCard';
import { BottomRightCard } from './BottomRightCard';

export const InterestsSection = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
      <AmateurNaturalistCard />
      <BottomRightCard />
    </div>
  );
}; 