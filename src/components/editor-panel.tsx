'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeView from '@/components/code-editor';
import PreviewView from '@/components/preview-view';

export default function EditorPanel() {
  return (
    <Tabs defaultValue="preview" className="w-full h-full flex flex-col">
      <div className="flex-shrink-0 p-2 border-b">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>
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
