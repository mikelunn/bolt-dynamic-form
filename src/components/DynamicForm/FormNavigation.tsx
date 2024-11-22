import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FormNavigationProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  isLastSection: boolean;
}

export function FormNavigation({
  currentSection,
  totalSections,
  onPrevious,
  isLastSection,
}: FormNavigationProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Progress value={progress} className="w-full h-2" />
        <p className="text-sm text-gray-500 text-right">
          Step {currentSection + 1} of {totalSections}
        </p>
      </div>
      
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={currentSection === 0}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          {isLastSection ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}