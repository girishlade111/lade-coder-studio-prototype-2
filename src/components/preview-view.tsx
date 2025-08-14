'use client';

import { useState } from 'react';
import { Laptop, Tablet, Smartphone, ExternalLink } from 'lucide-react';
import { useProject } from '@/hooks/use-project';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Device = 'desktop' | 'tablet' | 'mobile';

const deviceDimensions: Record<Device, { width: string; height: string }> = {
  desktop: { width: '100%', height: '100%' },
  tablet: { width: '768px', height: '1024px' },
  mobile: { width: '375px', height: '667px' },
};

export default function PreviewView() {
  const { currentCode } = useProject();
  const [device, setDevice] = useState<Device>('desktop');

  const openInNewTab = () => {
    const blob = new Blob([currentCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <TooltipProvider>
        <div className="flex-shrink-0 p-2 border-b bg-card flex items-center justify-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={device === 'desktop' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDevice('desktop')}>
                <Laptop className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Desktop</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={device === 'tablet' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDevice('tablet')}>
                <Tablet className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Tablet</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={device === 'mobile' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDevice('mobile')}>
                <Smartphone className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Mobile</p></TooltipContent>
          </Tooltip>
          <div className="mx-2 h-6 border-l"></div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={openInNewTab}>
                <ExternalLink className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Open in new tab</p></TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div className="flex-1 p-4 flex items-center justify-center overflow-auto">
        <iframe
          srcDoc={currentCode}
          title="Live Preview"
          sandbox="allow-scripts allow-same-origin"
          className="bg-white shadow-lg transition-all duration-300 ease-in-out"
          style={{
            width: deviceDimensions[device].width,
            height: deviceDimensions[device].height,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>
    </div>
  );
}
