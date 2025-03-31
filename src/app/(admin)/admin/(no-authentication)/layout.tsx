import type { Metadata } from "next";
import "../../../global.css";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveScaler from "../../../appComponents/ResponsiveScaler";
import { StoreProvider } from "../../../redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin ",
  description: "Admin Panel",
};

export default function EmptyAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ResponsiveScaler>
          <StoreProvider>
            <main className="app-content">
              <div className="content-container">{children}</div>
            </main>
          </StoreProvider>
        </ResponsiveScaler>
      </body>
    </html>
  );
}
