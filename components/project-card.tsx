import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    languages: string[];
    lastUpdated: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-1">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.languages.map((language) => (
              <Badge key={language} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Updated {formattedDate}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}