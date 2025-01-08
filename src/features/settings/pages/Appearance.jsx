import { Alert, AlertDescription } from '@/components/ui/alert';
import Default from '../layout/Default';
import { Info } from 'lucide-react';
import Theme from '../components/Theme';
import ColorThemes from '../components/ColorThemes';

const page = 'Appearance';
const pageTitle = 'Appearance';
const pageDescription = `Adjust themes, colors and layout for a personalized experience.`;

function Appearance() {
  return (
    <Default
      page={page}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <Alert className="flex items-center border-none bg-blue-400/15">
        <AlertDescription className="inline-flex items-center gap-3 text-blue-500">
          <Info />
          Your preference will be automatically saved for future visits
        </AlertDescription>
      </Alert>
      <Theme />
      <ColorThemes />
    </Default>
  );
}

export default Appearance;
