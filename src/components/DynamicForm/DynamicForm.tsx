import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormConfig } from '@/types/form';
import { FormSection } from './FormSection';
import { FormNavigation } from './FormNavigation';
import { useFormSchema } from './useFormSchema';

interface DynamicFormProps {
  config: FormConfig;
}

export function DynamicForm({ config }: DynamicFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const schema = useFormSchema(config);
  
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (currentSection < config.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      await config.onSubmit(data);
    }
  };

  const handlePrevious = () => {
    setCurrentSection(prev => prev - 1);
  };

  const isLastSection = currentSection === config.sections.length - 1;

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <FormSection
          section={config.sections[currentSection]}
          form={form}
        />
        
        <FormNavigation
          currentSection={currentSection}
          totalSections={config.sections.length}
          onPrevious={handlePrevious}
          isLastSection={isLastSection}
        />
      </form>
    </div>
  );
}