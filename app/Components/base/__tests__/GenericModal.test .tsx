    import '@testing-library/jest-dom'
    import { render, screen, fireEvent} from '@testing-library/react'
    import GenericModal from '../GenericModal'
    
    describe('GenericModal', () => {
        it('renders a modale', () => {
            render(<GenericModal  title="my-modal" closeHandler={() => {}}><div>Hey</div></GenericModal>)
        
            const genericModal = screen.getByTestId("generic-modal")
        
            expect(genericModal).toBeInTheDocument()
        })

        it('renders a close button', () => {
            render(<GenericModal  title="my-modal" closeHandler={() => {}}><div>Hey</div></GenericModal>)
        
            const genericModalCloseButton = screen.getByTestId("close-button")
        
            expect(genericModalCloseButton).toBeInTheDocument()
        })

    })