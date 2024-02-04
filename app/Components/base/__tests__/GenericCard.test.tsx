    import '@testing-library/jest-dom'
    import { render, screen, fireEvent} from '@testing-library/react'
    import GenericCard from '../GenericCard'
    
    describe('GenericCard', () => {
        it('renders a card', () => {
            render(<GenericCard title="test"><div data-testid={"inner-content"}>Content</div></GenericCard>)
        
            const genericCard = screen.getByTestId("generic-card")
            expect(genericCard).toBeInTheDocument()

            const innerContent = screen.getByTestId( "inner-content" );
            expect(innerContent).toBeInTheDocument()

        })

        it('renders card title', () => {
            render(<GenericCard title="test"><div>Content</div></GenericCard>)
        
            const genericCard = screen.getByTestId("generic-card-title")
        
            expect(genericCard).toBeInTheDocument();
            expect(genericCard).toHaveTextContent("test");
        })

    })