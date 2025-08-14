'use client';

import { useState } from 'react';
import { Send, FilePlus2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useProject } from '@/hooks/use-project';
import { useToast } from '@/hooks/use-toast';
import { generateCodeAction } from '@/app/actions';
import VersionHistory from '@/components/version-history';
import ThemeToggle from '@/components/theme-toggle';

interface ChatPanelProps {
  onNewProject: () => void;
}

export default function ChatPanel({ onNewProject }: ChatPanelProps) {
  const { chatHistory, addMessage, currentCode, setCurrentCode, isLoading, setIsLoading } = useProject();
  const [followUp, setFollowUp] = useState('');
  const { toast } = useToast();

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUp || isLoading) return;

    setIsLoading(true);
    addMessage({ role: 'user', content: followUp });
    setFollowUp('');

    const result = await generateCodeAction(followUp, currentCode);

    if (result.success && result.data) {
      setCurrentCode(result.data.modifiedCode);
      addMessage({ role: 'system', content: 'Code updated successfully.' });
    } else {
      toast({ title: 'Update Failed', description: result.error, variant: 'destructive' });
      addMessage({ role: 'system', content: `Error: ${result.error}` });
    }
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-2 border-b">
        <h2 className="text-lg font-headline font-semibold pl-2">Lade Coder</h2>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={onNewProject}>
                <FilePlus2 className="h-5 w-5" />
                <span className="sr-only">New Project</span>
            </Button>
        </div>
      </header>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                msg.role === 'user' ? 'bg-primary/80 text-primary-foreground' : 
                msg.role === 'system' ? 'bg-muted text-muted-foreground italic text-sm' :
                'bg-secondary text-secondary-foreground'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
              <div className="flex items-start">
                  <div className="rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
                      <LoaderCircle className="animate-spin h-5 w-5" />
                  </div>
              </div>
          )}
        </div>
      </ScrollArea>
      
      <Separator />
      <VersionHistory />
      <Separator />

      <div className="p-4 border-t">
        <form onSubmit={handleFollowUp} className="relative">
          <Textarea
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Make the header sticky..."
            className="pr-12"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFollowUp(e);
              }
            }}
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute top-1/2 right-2 -translate-y-1/2" disabled={isLoading}>
            <Send />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
