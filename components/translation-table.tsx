"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Edit, Check, Wand2 } from "lucide-react";

interface TranslationTableProps {
  translations: Array<{
    key: string;
    translations: Record<string, string>;
  }>;
  languages: Array<{
    id: string;
    name: string;
  }>;
  onTranslationChange: (key: string, language: string, value: string) => void;
}

export function TranslationTable({
  translations,
  languages,
  onTranslationChange,
}: TranslationTableProps) {
  const [editingCell, setEditingCell] = useState<{
    key: string;
    language: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);

  const startEditing = (key: string, language: string, currentValue: string) => {
    setEditingCell({ key, language });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingCell) {
      onTranslationChange(editingCell.key, editingCell.language, editValue);
      setEditingCell(null);
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
  };

  const handleGenerateAI = () => {
    setGeneratingAI(true);
    
    // Simulate AI generation - in a real app, this would call an AI API
    setTimeout(() => {
      // Find missing translations and fill them
      const updatedTranslations = [...translations];
      
      updatedTranslations.forEach((translation) => {
        languages.forEach((language) => {
          // If a translation is missing for a language but exists for reference language (en-US)
          if (!translation.translations[language.id] && translation.translations["en-US"]) {
            const sourceText = translation.translations["en-US"];
            
            // Simple mock AI translation (in a real app this would be from the API)
            let aiTranslation = "";
            
            if (language.id === "fr-FR") {
              // Very basic simulation of French translation
              aiTranslation = sourceText
                .replace("Hello", "Bonjour")
                .replace("World", "Monde")
                .replace("Doctor", "Médecin")
                .replace("Home", "Accueil");
            }
            
            if (aiTranslation) {
              onTranslationChange(translation.key, language.id, aiTranslation);
            }
          }
        });
      });
      
      setGeneratingAI(false);
    }, 2000);
  };

  const keyPathDisplay = (key: string) => {
    const parts = key.split('.');
    if (parts.length <= 1) return key;
    
    return (
      <div className="flex flex-col gap-1">
        <div className="text-xs text-muted-foreground">{parts.slice(0, -1).join('.')}</div>
        <div className="font-medium">{parts[parts.length - 1]}</div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Translation Entries</h3>
          <p className="text-sm text-muted-foreground">
            {translations.length} translation keys across {languages.length} languages
          </p>
        </div>
        <Button 
          onClick={handleGenerateAI}
          disabled={generatingAI}
          className="relative"
        >
          {generatingAI ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-5 w-5 animate-spin text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <span className="opacity-0">Generate with AI</span>
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Key</TableHead>
              {languages.map((language) => (
                <TableHead key={language.id}>
                  {language.name}
                  <Badge variant="outline" className="ml-2">
                    {language.id}
                  </Badge>
                </TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {translations.map((translation) => (
              <TableRow key={translation.key}>
                <TableCell className="font-mono text-xs">
                  {keyPathDisplay(translation.key)}
                </TableCell>
                {languages.map((language) => (
                  <TableCell key={language.id}>
                    {editingCell?.key === translation.key &&
                    editingCell?.language === language.id ? (
                      <div className="flex flex-col gap-2">
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="min-h-[100px] resize-none"
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" onClick={saveEdit}>
                            <Check className="mr-1 h-3 w-3" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer rounded p-2 hover:bg-muted/50"
                        onClick={() =>
                          startEditing(
                            translation.key,
                            language.id,
                            translation.translations[language.id] || ""
                          )
                        }
                      >
                        {translation.translations[language.id] || (
                          <span className="text-muted-foreground italic">
                            No translation
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      startEditing(
                        translation.key,
                        languages[0].id,
                        translation.translations[languages[0].id] || ""
                      )
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}