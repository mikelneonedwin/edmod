import { AuthProvider } from "@/context/auth";
import { rollbarClientConfig } from "@/lib/rollbar";
import { Provider as RollbarProvider } from "@rollbar/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edmod - Interactive Learning Platform",
  description:
    "Challenge yourself with timed quizzes and compete on the leaderboard",
  openGraph: {
    title: "Edmod - Interactive Learning Platform",
    description:
      "Challenge yourself with timed quizzes and compete on the leaderboard",
    url: "https://edmod.vercel.app",
    siteName: "Edmod",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edmod - Interactive Learning Platform",
    description:
      "Challenge yourself with timed quizzes and compete on the leaderboard",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RollbarProvider config={rollbarClientConfig}>
        <html lang="en">
          <body className={inter.className}>
            <NextTopLoader showSpinner={false} />
            {children}
          </body>
        </html>
      </RollbarProvider>
    </AuthProvider>
  );
}
