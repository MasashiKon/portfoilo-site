import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Masashi Konno",
  description: "This page is Masashi Konno's portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="iOS_body">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
