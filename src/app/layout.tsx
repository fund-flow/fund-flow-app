import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import PrivyAuthProvider from "@/components/providers/privy-auth-provider";
import { Toaster } from "@/components/ui/sonner";
import NProgressBar from "@/components/ui/ngprogress-bar";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fund Flow",
  description: "Your Personal Onchain Copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className}`}>
        <NProgressBar>
          <PrivyAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="sticky bottom-0 overflow-hidden md:overflow-visible">
                {children}
                <Toaster />
              </main>
            </ThemeProvider>
          </PrivyAuthProvider>
        </NProgressBar>
      </body>
    </html>
  );
}
