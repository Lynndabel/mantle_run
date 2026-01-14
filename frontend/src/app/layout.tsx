import "./globals.css";
import "nes.css/css/nes.min.css";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantle Run - Web3 Gaming on Mantle",
  description: "Play, learn about Mantle, and earn rewards!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} style={{ imageRendering: 'pixelated' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
