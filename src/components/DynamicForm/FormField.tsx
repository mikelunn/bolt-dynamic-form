import { UseFormReturn } from 'react-hook-form';
import { FormField as FormFieldType } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldProps {
  field: FormFieldType;
  form: UseFormReturn<any>;
}

export function FormField({ field, form }: FormFieldProps) {
  const { register, formState: { errors } } = form;
  const error = errors[field.id];

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full"
            {...register(field.id)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            className="w-full"
            {...register(field.id)}
          />
        );

      case 'select':
        return (
          <Select onValueChange={value => form.setValue(field.id, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              className="h-4 w-4 rounded border-gray-300"
              onCheckedChange={checked => form.setValue(field.id, checked)}
            />
            <Label htmlFor={field.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {field.label}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            onValueChange={value => form.setValue(field.id, value)}
            className="flex flex-col space-y-2"
          >
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`${field.id}-${option.value}`} />
                <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {field.type !== 'checkbox' && (
        <Label htmlFor={field.id} className="text-sm font-medium">
          {field.label}
        </Label>
      )}
      {renderField()}
      {error && (
        <p className="text-sm text-red-500">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}