import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster"; // ✅ Import Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextLeaf - Spring Into Your Career Today",
  description: "Search and apply for jobs on our platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster /> {/* ✅ Display toast notifications globally */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
