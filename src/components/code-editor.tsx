'use client';

import { useState, useEffect } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import { useProject } from '@/hooks/use-project';
import { Skeleton } from './ui/skeleton';

export default function CodeView() {
  const { currentCode, setCurrentCode } = useProject();
  const [displayedCode, setDisplayedCode] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Detect system theme for Monaco editor
    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(darkModeMatcher.matches ? 'vs-dark' : 'light');
    const listener = (e: MediaQueryListEvent) => setTheme(e.matches ? 'vs-dark' : 'light');
    darkModeMatcher.addEventListener('change', listener);
    return () => darkModeMatcher.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (currentCode) {
      let i = 0;
      setDisplayedCode('');
      const timer = setInterval(() => {
        setDisplayedCode(currentCode.substring(0, i));
        i++;
        if (i > currentCode.length) {
          clearInterval(timer);
        }
      }, 5);
      return () => clearInterval(timer);
    }
  }, [currentCode]);

  const handleEditorChange: OnChange = (value) => {
    // This allows manual edits to be saved to state
    // For now, we disable this to keep it one-way from AI
    // If needed, can be enabled with: setCurrentCode(value || '');
  };

  return (
    <div className="h-full w-full font-code">
      <Editor
        height="100%"
        language="html"
        value={displayedCode}
        onChange={handleEditorChange}
        theme={theme}
        loading={<Skeleton className="w-full h-full" />}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          readOnly: false, // Set to false to allow edits if desired
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
