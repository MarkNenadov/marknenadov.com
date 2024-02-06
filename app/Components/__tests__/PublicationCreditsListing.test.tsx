import '@testing-library/jest-dom'
import { render, screen, fireEvent} from '@testing-library/react'
import PublicationCreditListing from '../PublicationCreditListing';

describe('PublicationCreditListing', () => {
    it('renders without crashing', () => {
      render(<PublicationCreditListing />);
    });
  
    it('toggles TechnicalReviewsModal on button click', () => {
      const { getByText } = render(<PublicationCreditListing />);
      
      // Initially, the modal should not be present
      expect(() => screen.getByTestId("technical-review-modal")).toThrow();

      // Click the button to open the modal
      fireEvent.click(screen.getByTestId("technical-reviews-button"));
  
      // Now, the modal should be present
      expect(screen.getByTestId("technical-review-modal")).toBeInTheDocument();
  
      // Click the button again to close the modal
      fireEvent.click(screen.getByTestId("close-button"));
  
      // Now, the modal should be removed
      expect(() => screen.getByTestId("technical-review-modal")).toThrow();
    });
  });