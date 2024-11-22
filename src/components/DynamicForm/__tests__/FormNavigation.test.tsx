import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormNavigation } from '../FormNavigation';

describe('FormNavigation', () => {
  const defaultProps = {
    currentSection: 1,
    totalSections: 3,
    onPrevious: vi.fn(),
    isLastSection: false,
  };

  it('renders navigation buttons correctly', () => {
    render(<FormNavigation {...defaultProps} />);
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows submit button on last section', () => {
    render(<FormNavigation {...defaultProps} isLastSection={true} />);
    
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('disables previous button on first section', () => {
    render(<FormNavigation {...defaultProps} currentSection={0} />);
    
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('calls onPrevious when previous button is clicked', () => {
    render(<FormNavigation {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Previous'));
    expect(defaultProps.onPrevious).toHaveBeenCalled();
  });
});