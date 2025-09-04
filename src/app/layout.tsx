/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./shared/theme-provider";
import cn from "@/utils/class-names";
import { inter, lexendDeca } from "./fonts";
import dynamic from "next/dynamic";
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { AuthProvider } from "./shared/auth-provider";

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "Prelo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <AuthProvider>
        <ThemeProvider>
        <NextProgress />
          {children}
          <Toaster position="top-right" toastOptions={{
            success : {
              style: {
                backgroundColor: "green",
                color: "white"
              }
            },
            error: {
              style: {
                backgroundColor: "red",
                color: "white"
              }
            }
          }} />
          <GlobalDrawer />
          <GlobalModal />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
