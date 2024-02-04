    import '@testing-library/jest-dom'
    import { render, screen, fireEvent} from '@testing-library/react'
    import GenericModal from '../GenericModal'
    
    describe('GenericModal', () => {
        it('renders a modal', () => {
            render(<GenericModal  title="my-modal" closeHandler={() => {}}><div data-testid="test-test-id">Hey</div></GenericModal>)
        
            const genericModal = screen.getByTestId("generic-modal")
        
            expect(genericModal).toBeInTheDocument()

            const childDiv = screen.getByTestId("test-test-id")
        
            expect(childDiv).toBeInTheDocument()
            expect(childDiv).toHaveTextContent("Hey")

        })

        it('renders a close button', () => {
            render(<GenericModal  title="my-modal" closeHandler={() => {}}><div>Hey</div></GenericModal>)
        
            const genericModalCloseButton = screen.getByTestId("close-button")
        
            expect(genericModalCloseButton).toBeInTheDocument()
        })

        it('close button Works', () => {
            const handler = jest.fn();
            render(<GenericModal  title="my-modal" closeHandler={handler}><div>Hey</div></GenericModal>)
        
            const closeButton = screen.getByTestId("close-button")
    
            fireEvent.click( closeButton );
        
            expect(handler).toHaveBeenCalled();
        })
    
    })