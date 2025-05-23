"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { CreateProjectDialog } from "@/components/create-project-dialog";
import { GlobeFolderIcon } from "@/components/icons/globe-folder";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Array<{ id: string; name: string; description: string; languages: string[]; lastUpdated: string }>>([
    {
      id: "1",
      name: "Website Localization",
      description: "Main website content translations",
      languages: ["en-US", "fr-FR", "es-ES"],
      lastUpdated: "2025-04-10T15:45:00.000Z",
    },
    {
      id: "2",
      name: "Mobile App Strings",
      description: "Mobile application interface translations",
      languages: ["en-US", "de-DE", "ja-JP"],
      lastUpdated: "2025-04-08T09:30:00.000Z",
    },
  ]);

  useEffect(() => {
    fetchProjects();
  }, []);


  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/projects');
      console.log(response);
      const data = await response.json();
      setProjects(data.map((item: any) => ({
        id: item.id.toString(),
        name: item.key,
        description: item.translations.description || '',
        languages: Object.keys(item.translations),
        lastUpdated: item.updated_at,
      })));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = (project: { name: string; description: string }) => {
    setProjects((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        name: project.name,
        description: project.description,
        languages: ["en-US"],
        lastUpdated: new Date().toISOString(),
      },
    ]);
    setOpen(false);
  };

  

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <GlobeFolderIcon className="h-6 w-6" />
              <span className="text-lg font-medium">TranslateHub</span>
            </Link>
          </div>
          <nav className="ml-6 hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
            <Button size="sm">Account</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Your Projects</h2>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <Card className="flex h-[180px] cursor-pointer flex-col items-center justify-center border-dashed" onClick={() => setOpen(true)}>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <Plus className="h-8 w-8" />
                <span className="text-sm font-medium">Create new project</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <CreateProjectDialog
        open={open}
        onOpenChange={setOpen}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}