import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import GenerateForm from "./components/generate-form";
import { VideoQueueProvider } from "@/hooks/video-queue-context";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Lumeo",
  description: "Bring your ideas to light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <VideoQueueProvider userId={user?.user?.id ?? ""} initialVideos={[]}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="relative">
                <div className="relative flex flex-col h-screen">
                  <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                    </div>
                  </header>
                  <main className="flex-1 overflow-y-auto pb-32">{children}</main>
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <GenerateForm />
                  </div>
                </div>
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </VideoQueueProvider>
  );
}
