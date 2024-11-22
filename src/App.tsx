import { DynamicForm } from './components/DynamicForm/DynamicForm';
import type { FormConfig } from './types/form';

const formConfig: FormConfig = {
  sections: [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Please provide your basic information',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'john@example.com',
          validation: { required: true }
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Tell us about your preferences',
      fields: [
        {
          id: 'theme',
          type: 'select',
          label: 'Preferred Theme',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' }
          ]
        },
        {
          id: 'notifications',
          type: 'checkbox',
          label: 'Enable Notifications'
        }
      ]
    }
  ],
  onSubmit: async (data) => {
    console.log('Form submitted:', data);
  }
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dynamic Form Demo</h1>
          <p className="mt-2 text-sm text-gray-600">Complete all sections to proceed</p>
        </div>
        <DynamicForm config={formConfig} />
      </div>
    </div>
  );
}

export default App;