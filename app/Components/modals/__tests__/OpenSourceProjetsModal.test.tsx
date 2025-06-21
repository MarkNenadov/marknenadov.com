import '@testing-library/jest-dom'
import { render, screen, fireEvent} from '@testing-library/react'
import OpenSourceProjectsModal from '../OpenSourceProjectsModal';

describe('OpenSourceProjectsModal', () => {
    it('renders the modal', () => {
        render(<OpenSourceProjectsModal openSourceProjects={[]} setIsSelectedProjectsOpen={() => {}} />)
    
        const modal = screen.getByTestId("generic-modal")
    
        expect(modal).toBeInTheDocument()
    })

    it('close the modal', () => {
        const handler = jest.fn();
        render(<OpenSourceProjectsModal openSourceProjects={[]} setIsSelectedProjectsOpen={handler} />)
    
        const closeButton = screen.getByTestId("close-button")

        fireEvent.click( closeButton );
    
        expect(handler).toHaveBeenCalled();
    })
})