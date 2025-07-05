import React, { ReactNode } from 'react';

interface CardContextValue {
}

const CardContext = React.createContext<CardContextValue>({});

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

/**
 * Compound Card component with better composition
 * Usage:
 * <Card title="Title">
 *   <Card.Content>...</Card.Content>
 *   <Card.Actions>...</Card.Actions>
 * </Card>
 */
function CardRoot({ title, children, className = '' }: CardProps) {
  return (
    <CardContext.Provider value={{}}>
      <div className={`bg-surface-primary border border-border-primary shadow-soft-lg rounded-2xl p-5 w-full lg:w-auto h-auto lg:min-h-[272px] transition-all duration-200 hover:shadow-elegant hover:border-border-secondary overflow-hidden ${className}`} data-testid="generic-card">
        <div className="text-xl font-semibold text-text-primary mb-3" data-testid="generic-card-title">
          {title}
        </div>
        <div className="text-text-secondary overflow-hidden">
          {children}
        </div>
      </div>
    </CardContext.Provider>
  );
}

function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
}

function CardActions({ children, className = '' }: CardActionsProps) {
  return (
    <div className={`flex flex-col space-y-1.5 items-center ${className}`}>
      {children}
    </div>
  );
}

// Compound component pattern
export const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Actions: CardActions,
});

// Keep the old GenericCard as an alias for backward compatibility
export default CardRoot;