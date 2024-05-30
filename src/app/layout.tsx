import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { uploadthingRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={cn(inter.className, "flex h-full flex-col")}>
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadthingRouter)} />
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Providers>
            <Toaster />
            <Navbar />
            {children}
            {modal}
            <div id="modal-root" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
