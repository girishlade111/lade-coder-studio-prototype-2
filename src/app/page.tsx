'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { ProjectProvider } from '@/contexts/project-context';
import LandingPage from '@/components/landing';
import Workspace from '@/components/workspace';

export default function Home() {
  const [view, setView] = useState<'landing' | 'workspace'>('landing');

  // Prevent hydration errors with Framer Motion and Next.js
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <ProjectProvider>
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div key="landing" exit={{ opacity: 0 }}>
              <LandingPage setView={setView} />
            </motion.div>
          ) : (
            <motion.div key="workspace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Workspace setView={setView} />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </ProjectProvider>
  );
}
