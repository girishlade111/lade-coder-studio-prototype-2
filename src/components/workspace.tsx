'use client';

import { motion } from 'framer-motion';
import ChatPanel from '@/components/chat-panel';
import EditorPanel from '@/components/editor-panel';
import { useProject } from '@/hooks/use-project';

interface WorkspaceProps {
  setView: (view: 'landing' | 'workspace') => void;
}

export default function Workspace({ setView }: WorkspaceProps) {
  const { resetProject } = useProject();

  const handleNewProject = () => {
    resetProject();
    setView('landing');
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <motion.div
        layoutId="prompt-bar"
        className="w-[350px] min-w-[300px] max-w-[450px] h-full flex flex-col bg-card border-r"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <ChatPanel onNewProject={handleNewProject} />
      </motion.div>
      <main className="flex-1 h-full">
        <EditorPanel />
      </main>
    </div>
  );
}
