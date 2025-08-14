'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Wand2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProject } from '@/hooks/use-project';
import { useToast } from '@/hooks/use-toast';
import { optimizePromptAction, generateCodeAction } from '@/app/actions';

interface LandingPageProps {
  setView: (view: 'landing' | 'workspace') => void;
}

export default function LandingPage({ setView }: LandingPageProps) {
  const { prompt, setPrompt, addMessage, setCurrentCode, setIsLoading, isLoading } = useProject();
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!prompt) {
      toast({ title: 'Prompt is empty', description: 'Please enter a prompt to optimize.' });
      return;
    }
    setIsOptimizing(true);
    const result = await optimizePromptAction(prompt);
    if (result.success && result.data) {
      setPrompt(result.data.optimizedPrompt);
      toast({ title: 'Prompt Optimized', description: 'Your prompt has been enhanced.' });
    } else {
      toast({ title: 'Optimization Failed', description: result.error, variant: 'destructive' });
    }
    setIsOptimizing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      toast({ title: 'Prompt is empty', description: 'Please enter a prompt to generate a website.' });
      return;
    }
    setIsLoading(true);
    addMessage({ role: 'user', content: prompt });
    
    // Switch view optimistically
    setView('workspace');

    const result = await generateCodeAction(prompt);
    if (result.success && result.data) {
      setCurrentCode(result.data.modifiedCode);
      addMessage({ role: 'system', content: 'Initial code generated successfully.' });
    } else {
      toast({ title: 'Generation Failed', description: result.error, variant: 'destructive' });
      addMessage({ role: 'system', content: `Error: ${result.error}` });
      setView('landing'); // Revert view on failure
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        layoutId="prompt-bar"
        className="w-full max-w-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <header className="text-center mb-8">
            <h1 className="text-5xl font-bold font-headline text-gray-800 dark:text-gray-200">Lade Coder</h1>
            <p className="text-muted-foreground mt-2">Generate a website with a single prompt.</p>
        </header>
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A personal portfolio for a photographer, dark theme, with a gallery..."
            className="h-14 text-lg pl-4 pr-28 rounded-full shadow-lg"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center space-x-2">
             <Button type="button" size="icon" variant="ghost" onClick={handleOptimize} disabled={isOptimizing || isLoading}>
              {isOptimizing ? <LoaderCircle className="animate-spin" /> : <Wand2 />}
              <span className="sr-only">Optimize Prompt</span>
            </Button>
            <Button type="submit" size="icon" variant="ghost" disabled={isLoading}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : <Send />}
              <span className="sr-only">Generate Website</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
