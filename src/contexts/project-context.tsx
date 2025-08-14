'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import type { ChatMessage, Version } from '@/types';

interface ProjectContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  chatHistory: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  currentCode: string;
  setCurrentCode: (code: string) => void;
  versions: Version[];
  addVersion: (code: string) => void;
  restoreVersion: (versionId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  resetProject: () => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const LS_KEY = 'lade-coder-project';

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(LS_KEY);
      if (savedState) {
        const { prompt, chatHistory, currentCode, versions } = JSON.parse(savedState);
        setPrompt(prompt || '');
        setChatHistory(chatHistory || []);
        setCurrentCode(currentCode || '');
        setVersions(versions || []);
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const stateToSave = JSON.stringify({ prompt, chatHistory, currentCode, versions });
    localStorage.setItem(LS_KEY, stateToSave);
  }, [prompt, chatHistory, currentCode, versions]);

  const addMessage = (message: Omit<ChatMessage, 'id'>) => {
    setChatHistory(prev => [...prev, { ...message, id: crypto.randomUUID() }]);
  };

  const addVersion = (code: string) => {
    const newVersion: Version = {
      id: crypto.randomUUID(),
      code,
      createdAt: new Date().toISOString(),
    };
    setVersions(prev => [newVersion, ...prev]);
  };
  
  const handleSetCurrentCode = (code: string) => {
    setCurrentCode(code);
    addVersion(code);
  }

  const restoreVersion = (versionId: string) => {
    const versionToRestore = versions.find(v => v.id === versionId);
    if (versionToRestore) {
      setCurrentCode(versionToRestore.code);
    }
  };
  
  const resetProject = () => {
    setPrompt('');
    setChatHistory([]);
    setCurrentCode('');
    setVersions([]);
    setIsLoading(false);
    localStorage.removeItem(LS_KEY);
  }

  const value = {
    prompt,
    setPrompt,
    chatHistory,
    addMessage,
    currentCode,
    setCurrentCode: handleSetCurrentCode,
    versions,
    addVersion,
    restoreVersion,
    isLoading,
    setIsLoading,
    resetProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}
