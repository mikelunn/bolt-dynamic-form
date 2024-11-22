import { FormSection as FormSectionType } from '@/types/form';
import { FormField } from './FormField';
import { UseFormReturn } from 'react-hook-form';

interface FormSectionProps {
  section: FormSectionType;
  form: UseFormReturn<any>;
}

export function FormSection({ section, form }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
        {section.description && (
          <p className="text-sm text-gray-500">{section.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {section.fields.map((field) => (
          <FormField key={field.id} field={field} form={form} />
        ))}
      </div>
    </div>
  );
}