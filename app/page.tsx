import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlobeFolderIcon } from "@/components/icons/globe-folder";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <GlobeFolderIcon className="h-6 w-6" />
            <span className="text-lg font-medium">TranslateHub</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-background dark:to-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Simplify Translation Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    An intuitive platform for teams to import, edit, and export JSON translation files.
                    No technical knowledge required.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/docs">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-lg border bg-background p-2 shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg" 
                    alt="TranslateHub Dashboard Preview" 
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Import Files</h3>
                <p className="text-muted-foreground">
                  Easily import your existing JSON translation files with a simple drag-and-drop interface.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Edit Translations</h3>
                <p className="text-muted-foreground">
                  Edit your translations in a clean, intuitive interface designed for collaboration.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Export Updated Files</h3>
                <p className="text-muted-foreground">
                  Export your updated translations back to JSON format, ready to use with any i18n library.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <GlobeFolderIcon className="h-5 w-5" />
              <p className="text-sm text-muted-foreground">
                © 2025 TranslateHub. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}