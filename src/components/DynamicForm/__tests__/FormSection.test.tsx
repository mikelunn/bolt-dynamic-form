import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormSection } from '../FormSection';
import { useForm } from 'react-hook-form';

describe('FormSection', () => {
  const TestWrapper = ({ section }: { section: any }) => {
    const form = useForm();
    return <FormSection section={section} form={form} />;
  };

  it('renders section title and description', () => {
    const section = {
      id: 'test',
      title: 'Test Section',
      description: 'Test Description',
      fields: []
    };

    render(<TestWrapper section={section} />);
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders all fields in the section', () => {
    const section = {
      id: 'test',
      title: 'Test Section',
      fields: [
        {
          id: 'field1',
          type: 'text',
          label: 'Field 1'
        },
        {
          id: 'field2',
          type: 'text',
          label: 'Field 2'
        }
      ]
    };

    render(<TestWrapper section={section} />);
    expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
  });
});