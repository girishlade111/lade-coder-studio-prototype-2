'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeView from '@/components/code-editor';
import PreviewView from '@/components/preview-view';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EditorPanel() {
  const { toast } = useToast();

  const handlePublish = () => {
    // This is a placeholder for the actual publishing logic.
    // In a real application, this would trigger a process to deploy
    // the code to a hosting service like Vercel or Netlify.
    toast({
      title: 'Publishing Not Implemented',
      description: 'This feature is not yet connected to a deployment service.',
    });
  };
  
  return (
    <Tabs defaultValue="preview" className="w-full h-full flex flex-col">
      <div className="flex-shrink-0 p-2 border-b flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>
        <Button onClick={handlePublish}>
          <Upload className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>
      <TabsContent value="code" className="flex-1 overflow-auto mt-0">
        <CodeView />
      </TabsContent>
      <TabsContent value="preview" className="flex-1 overflow-auto mt-0 bg-muted/20">
        <PreviewView />
      </TabsContent>
    </Tabs>
  );
}
