import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Room } from "./Room";
import "./globals.css";

const wokSans = Work_Sans({ subsets: ["latin"], variable: '--font-work-sans', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: "Figma clone",
  description: "Figma clone using fiber.js, liveblocks cloborators and next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${wokSans.className} bg-primary-grey-200`}>
        <Room>
          {children}
        </Room>
      </body>
    </html>
  );
}
