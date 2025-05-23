"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Check, FileJson } from "lucide-react";
import { flattenObject } from "@/lib/utils";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  setTranslations: React.Dispatch<React.SetStateAction<any[]>>;
}

export function ImportDialog({
  open,
  onOpenChange,
  projectId,
  setTranslations,
}: ImportDialogProps) {
  const [files, setFiles] = useState<{ name: string; content: any; language: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    const language = file.name.replace(".json", "");

    reader.onload = (event) => {
      try {
        const parsedContent = JSON.parse(event.target?.result as string);
        setFiles((prev) => [
          ...prev,
          { name: file.name, content: parsedContent, language },
        ]);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        // Show an error message to the user
      }
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        if (file.type === "application/json") {
          processFile(file);
        }
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        processFile(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImport = () => {
    // Process files and combine translations
    const allTranslations: Record<string, Record<string, string>> = {};
    
    files.forEach((file) => {
      const flattened = flattenObject(file.content);
      
      Object.entries(flattened).forEach(([key, value]) => {
        if (!allTranslations[key]) {
          allTranslations[key] = {};
        }
        allTranslations[key][file.language] = value as string;
      });
    });
    
    // Convert to array format
    const translationsArray = Object.entries(allTranslations).map(([key, translations]) => ({
      key,
      translations,
    }));
    
    // Update translations in the parent component
    setTranslations(translationsArray);
    
    // Close dialog and reset
    onOpenChange(false);
    setFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Import translation files</DialogTitle>
          <DialogDescription>
            Upload your JSON translation files to import them into your project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            className={`flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="application/json"
              multiple
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose files or drag & drop
            </Button>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              JSON files only (.json)
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected files ({files.length})</Label>
              <div className="max-h-60 space-y-2 overflow-auto">
                {files.map((file, index) => (
                  <Card key={index} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <FileJson className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {Object.keys(flattenObject(file.content)).length} keys
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFiles([]);
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={files.length === 0}
              onClick={handleImport}
            >
              <Check className="mr-2 h-4 w-4" />
              Import Files
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}