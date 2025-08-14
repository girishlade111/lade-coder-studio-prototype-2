'use client';

import { History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useProject } from '@/hooks/use-project';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from './ui/scroll-area';

export default function VersionHistory() {
  const { versions, restoreVersion, currentCode } = useProject();

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-4 py-2 text-left">
          <History className="mr-2 h-4 w-4" />
          Version History ({versions.length})
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="h-[150px] px-4">
          {versions.length > 0 ? (
            <ul className="space-y-2 py-2">
              {versions.map((version) => (
                <li key={version.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => restoreVersion(version.id)}
                    disabled={version.code === currentCode}
                  >
                    Restore
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No versions yet.</p>
          )}
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}
