import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicForm } from '../DynamicForm';
import { FormConfig } from '@/types/form';

describe('DynamicForm', () => {
  const mockConfig: FormConfig = {
    sections: [
      {
        id: 'personal',
        title: 'Personal Information',
        fields: [
          {
            id: 'name',
            type: 'text',
            label: 'Full Name',
            validation: { required: true }
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email',
            validation: { required: true }
          }
        ]
      },
      {
        id: 'preferences',
        title: 'Preferences',
        fields: [
          {
            id: 'newsletter',
            type: 'checkbox',
            label: 'Subscribe to newsletter'
          }
        ]
      }
    ],
    onSubmit: vi.fn()
  };

  it('renders the first section initially', () => {
    render(<DynamicForm config={mockConfig} />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty required fields', async () => {
    render(<DynamicForm config={mockConfig} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(await screen.findByText('This field is required')).toBeInTheDocument();
  });

  it('moves to next section when form is valid', async () => {
    render(<DynamicForm config={mockConfig} />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(await screen.findByText('Preferences')).toBeInTheDocument();
  });
});