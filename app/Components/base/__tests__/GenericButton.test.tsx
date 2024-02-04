    import '@testing-library/jest-dom'
    import { render, screen, fireEvent} from '@testing-library/react'
    import GenericButton from '../GenericButton'
    
    describe('GenericButton', () => {
        it('renders a button with defualt test id', () => {
            render(<GenericButton text="test" onClick={() => {}} />)
        
            const genericButton = screen.getByTestId("generic-button")
        
            expect(genericButton).toBeInTheDocument()
        })

        it('renders a button with custom test id', () => {
            render(<GenericButton text="test" onClick={() => {}} dataTestId='test-test-id' />)
        
            const genericButton = screen.getByTestId("test-test-id")
        
            expect(genericButton).toBeInTheDocument()
        })


        it('renders button text when no short text', () => {
            render(<GenericButton text="test" onClick={() => {}} />)
        
            const smallSpan = screen.getByTestId("small-text-span")        
            expect(smallSpan).toBeInTheDocument()
            expect(smallSpan).toHaveTextContent( "test" )

            const largeSpan = screen.getByTestId("large-text-span")        
            expect(largeSpan).toBeInTheDocument()
            expect(largeSpan).toHaveTextContent( "test" )
        })

        it('renders button text when shorttext text', () => {
            render(<GenericButton text="test" shortText="short text" onClick={() => {}} />)
        
            const smallSpan = screen.getByTestId("small-text-span")        
            expect(smallSpan).toBeInTheDocument()
            expect(smallSpan).toHaveTextContent( "short text" )

            const largeSpan = screen.getByTestId("large-text-span")        
            expect(largeSpan).toBeInTheDocument()
            expect(largeSpan).toHaveTextContent( "test" )
        })

        it('button is clickable', () => {
            const onClick = jest.fn();

            render(<GenericButton text="test" onClick={onClick} />)
        
            const genericButton = screen.getByTestId("generic-button")
        
            fireEvent.click( genericButton )

            expect(onClick).toHaveBeenCalled()
        })
    })