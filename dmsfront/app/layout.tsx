import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel, Playfair_Display } from "next/font/google";
import { Providers } from "./components/Providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Document Tracking & Workflow System | Department of Government Information",
  description: "Official Document Tracking and Executive Workflow Portal - Department of Government Information, Sri Lanka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${cinzel.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#2C1810] font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

