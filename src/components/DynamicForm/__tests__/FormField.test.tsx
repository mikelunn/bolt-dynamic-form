import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from '../FormField';
import { useForm } from 'react-hook-form';

describe('FormField', () => {
  const TestWrapper = ({ field }: { field: any }) => {
    const form = useForm();
    return <FormField field={field} form={form} />;
  };

  it('renders text input correctly', () => {
    const field = {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your name'
    };

    render(<TestWrapper field={field} />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('renders select field with options', () => {
    const field = {
      id: 'country',
      type: 'select',
      label: 'Country',
      options: [
        { label: 'USA', value: 'us' },
        { label: 'Canada', value: 'ca' }
      ]
    };

    render(<TestWrapper field={field} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('renders checkbox field correctly', () => {
    const field = {
      id: 'terms',
      type: 'checkbox',
      label: 'Accept Terms'
    };

    render(<TestWrapper field={field} />);
    expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
  });
});