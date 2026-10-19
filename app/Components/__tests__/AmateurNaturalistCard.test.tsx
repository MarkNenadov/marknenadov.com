import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AmateurNaturalistCard } from '../AmateurNaturalistCard';

describe('AmateurNaturalistCard', () => {
    it('spells "Amateur" correctly in the title', () => {
      render(<AmateurNaturalistCard />);

      expect(screen.getByTestId('generic-card-title')).toHaveTextContent('Enthusiastic Amateur Naturalist');
    });
  });
