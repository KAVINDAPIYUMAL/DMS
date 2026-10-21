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
      suppressHydrationWarning
      className={`${jakarta.variable} ${cinzel.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('dms_theme');
                  var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="h-full overflow-hidden flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans transition-colors duration-200">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

