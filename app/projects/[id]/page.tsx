"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportDialog } from "@/components/import-dialog";
import { TranslationTable } from "@/components/translation-table";
import { ProjectHeader } from "@/components/project-header";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import { 
  ChevronLeft, 
  Download, 
  Upload, 
  Save,
  Search,
  Languages,
  ListFilter
} from "lucide-react";
import { Input } from "@/components/ui/input";

type Language = {
  id: string
  name: string
}

const languages = [
  { id: "en-US", name: "English (US)" },
  { id: "fr-FR", name: "French (France)" },
  { id: "it-IT", name: "Italian (Italy)" },
  { id: "de-DE", name: "Deutsch (Germany)" },
  { id: "ja-JP", name: "Japanese (Japan)" }
]

const mockTranslations = [
  // {
  //   key: "test.screen",
  //   translations: { "en-US": "", "fr-FR": "" }
  // }
];

export default function ProjectPage() {
  const { id } = useParams();
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [translations, setTranslations] = useState(mockTranslations);
  // const [translations, setTranslations] = useState();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("translations");

  const [selected, setSelected] = useState<Language[]>([])

  const toggleSelection = (id: string) => {
    const lang = languages.find(l => l.id === id)
    if (!lang) return

    setSelected(prev =>
      prev.some(l => l.id === id)
        ? prev.filter(l => l.id !== id)
        : [...prev, lang]
    )
  }

  const removeSelection = (id: string) => {
    setSelected(prev => prev.filter(l => l.id !== id))
  }

  const filteredTranslations = translations.filter(
    (translation) =>
      translation.key.toLowerCase().includes(search.toLowerCase()) ||
      Object.values(translation.translations).some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleTranslationChange = (
    key: string,
    language: string,
    value: string
  ) => {
    setTranslations((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              translations: {
                ...item.translations,
                [language]: value,
              },
            }
          : item
      )
    );
  };

  const handleExport = () => {
    // Create export files for each language
    const exportData: Record<string, Record<string, any>> = {};
    
    selected.forEach((language) => {
      const langData: Record<string, any> = {};
      
      translations.forEach((translation) => {
        // Handle nested keys with dot notation
        const keys = translation.key.split('.');
        let current = langData;
        
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = translation.translations[language.id] || "";
          } else {
            current[key] = current[key] || {};
            current = current[key];
          }
        });
      });
      
      exportData[language.id] = langData;
    });
    
    // Create download links for each language
    Object.entries(exportData).forEach(([langId, data]) => {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${langId}.json`;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    });
  };

  console.log(selected)

  return (
    <div className="flex min-h-screen flex-col">
      <ProjectHeader projectId={id as string} />
      <div className="container flex-1 px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to projects
              </Link>
            </Button>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search translations..."
                className="w-full pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setImportDialogOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="translations">
              <Languages className="mr-2 h-4 w-4" />
              Translations
            </TabsTrigger>
            <TabsTrigger className="ml-4 " value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="translations" className="space-y-4">
            <TranslationTable
              translations={filteredTranslations}
              languages={selected}
              onTranslationChange={handleTranslationChange}
            />
          </TabsContent>
          <TabsContent value="settings">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Project Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your project languages.
              </p>
            </div>
            <div className="rounded-lg border p-4 mt-10">
              <div className="flex flex-wrap gap-2">
                {selected.map(lang => (
                  <Badge key={lang.id} variant="secondary" className="flex items-center gap-1">
                    {lang.name}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeSelection(lang.id)} />
                  </Badge>
                ))}
              </div>

              <Select onValueChange={toggleSelection}>
                <SelectTrigger className="w-[250px] mt-4" >
                  <SelectValue placeholder="Select languages..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                      {selected.some(l => l.id === lang.id) && (
                        <span className="ml-2 text-sm text-muted-foreground">(Selected)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        projectId={id as string}
        setTranslations={setTranslations}
      />
    </div>
  );
}