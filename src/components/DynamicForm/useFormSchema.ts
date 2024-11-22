import { z } from 'zod';
import { FormConfig } from '@/types/form';

export function useFormSchema(config: FormConfig) {
  const generateSchema = () => {
    const schemaFields: Record<string, any> = {};
    
    config.sections.forEach(section => {
      section.fields.forEach(field => {
        let fieldSchema = z.any();
        
        if (field.type === 'text' || field.type === 'textarea') {
          fieldSchema = z.string();
        } else if (field.type === 'number') {
          fieldSchema = z.number().optional();
        } else if (field.type === 'email') {
          fieldSchema = z.string().email('Invalid email address');
        } else if (field.type === 'checkbox') {
          fieldSchema = z.boolean().optional();
        } else if (field.type === 'select' || field.type === 'radio') {
          fieldSchema = z.string().optional();
        }
        
        if (field.validation?.required) {
          fieldSchema = fieldSchema.min(1, 'This field is required');
        }
        if (field.validation?.minLength) {
          fieldSchema = fieldSchema.min(field.validation.minLength, 
            `Minimum ${field.validation.minLength} characters required`);
        }
        if (field.validation?.maxLength) {
          fieldSchema = fieldSchema.max(field.validation.maxLength,
            `Maximum ${field.validation.maxLength} characters allowed`);
        }
        
        schemaFields[field.id] = fieldSchema;
      });
    });
    
    return z.object(schemaFields);
  };

  return generateSchema();
}