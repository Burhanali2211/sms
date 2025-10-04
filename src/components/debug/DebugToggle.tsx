import React from 'react';
import { Button } from '@/components/ui/button';
import { Bug } from 'lucide-react';
import { useDebug } from '@/contexts/DebugContext';

const DebugToggle: React.FC = () => {
  const { setIsDebugWindowOpen, requests } = useDebug();
  
  // Count errors in requests
  const errorCount = requests.filter(req => 
    req.status && req.status >= 400
  ).length;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg bg-background border-2 hover:bg-muted"
        onClick={() => setIsDebugWindowOpen(true)}
      >
        <Bug className="h-5 w-5" />
        {errorCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {errorCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default DebugToggle;