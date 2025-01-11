import React from 'react';
import { Info, X } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

function ApperanceAlert() {
  const [close, setClose] = React.useState(() => {
    return localStorage.getItem('alert:appearance') || false;
  });

  const handleClose = () => {
    setClose(true);
    localStorage.setItem('alert:appearance', true);
  };

  return (
    !close && (
      <Alert className="flex items-center justify-between border-none bg-blue-400/15">
        <AlertDescription className="inline-flex items-center gap-3 text-blue-500">
          <Info className="shrink-0" />
          Your preference will be automatically saved for future visits
        </AlertDescription>
        <button onClick={handleClose}>
          <X size={16} className="text-blue-500" />
        </button>
      </Alert>
    )
  );
}

export default ApperanceAlert;
