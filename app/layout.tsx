import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";

// load the font
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // adjust weights you need
  display: "swap",
});

export const metadata: Metadata = {
  title: "James Victor Alvarez",
  description: "Computer Science Student • Portfolio & Projects",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.className} bg-[var(--bg-main)] text-[var(--text-main)]`}
      >
        {children}
      </body>
    </html>
  );
}
