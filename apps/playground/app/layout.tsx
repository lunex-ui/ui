import type { Metadata } from "next";

import "../../../packages/react/src/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunex UI Playground",
  description:
    "Preview Lunex UI components, tokens, and theme presets in a live playground."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
