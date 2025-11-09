import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import Scrollbar from "@/components/Scrollbar";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "James Victor Alvarez",
  description: "Computer Science Student • Portfolio & Projects",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.className} relative bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden`}
      >
        <div className="fixed inset-0 -z-10 pointer-events-none bg-dither" />
        {children}
        <Scrollbar />
        <CustomCursor />
      </body>
    </html>
  );
}
