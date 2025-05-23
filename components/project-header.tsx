"use client";

import { useState, useEffect } from "react";
import { GlobeFolderIcon } from "@/components/icons/globe-folder";
import Link from "next/link";

interface ProjectHeaderProps {
  projectId: string;
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const [project, setProject] = useState<{
    name: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    // In a real app, this would fetch the project data from the API
    setProject({
      name: projectId === "1" ? "Website Localization" : "Mobile App Strings",
      description: projectId === "1" 
        ? "Main website content translations" 
        : "Mobile application interface translations",
    });
  }, [projectId]);

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <GlobeFolderIcon className="h-6 w-6" />
            <span className="text-lg font-medium">TranslateHub</span>
          </Link>
        </div>
        <div className="ml-4 border-l pl-4">
          {project ? (
            <div>
              <h1 className="text-sm font-medium">{project.name}</h1>
              <p className="text-xs text-muted-foreground">{project.description}</p>
            </div>
          ) : (
            <div className="h-8 w-32 animate-pulse rounded bg-muted"></div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="/settings"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Settings
          </Link>
        </div>
      </div>
    </header>
  );
}