import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import LogoLanding from "@/components/logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Lumeo",
  description: "Bring your ideas to light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
          <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between gap-2 p-2">
              <LogoLanding href="/" />
              <div className="flex items-center gap-2">
                <Link className={buttonVariants({ variant: "outline" })} href="/login">Login</Link>
                <Link className={buttonVariants({ variant: "default" })} href="/login">Sign up</Link>
              </div>
            </div>
          </header>
          <main className="pt-[52px]">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
