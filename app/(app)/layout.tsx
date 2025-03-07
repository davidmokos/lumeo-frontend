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
import { createClient } from "@/utils/supabase/server";
import { MyLecturesProvider } from "@/hooks/my-lectures-context";

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
    // <VideoQueueProvider userId={user?.user?.id ?? ""} initialVideos={[]}>
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <MyLecturesProvider userId={user?.user?.id ?? ""} initialLectures={[]}>
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
                  <main className="flex-1 overflow-y-auto pb-32">
                    {children}
                  </main>
                </div>
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </MyLecturesProvider>
      </body>
    </html>

    // </VideoQueueProvider>
  );
}
