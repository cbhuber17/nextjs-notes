/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <div id="parchment"></div>
          <div id="container">
            <nav>
              <Link href="/">Home</Link>
              <Link href="/notes">Notes</Link>
            </nav>
            {children}
          </div>
        </main>
        <svg>
          <filter id="wavy2">
            <feTurbulence
              x="0"
              y="0"
              baseFrequency="0.02"
              numOctaves="5"
              seed="1"
            />
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
