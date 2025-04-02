import type { Metadata } from "next";
import "../../../global.css";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveScaler from "../../../appComponents/ResponsiveScaler";
import { StoreProvider } from "../../../redux/StoreProvider";
import ProtectedRoute from "../../../appComponents/ProtectedRoute";

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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ResponsiveScaler>
          <StoreProvider>
            <main className="app-content ">
              <nav className=" border-b  px-[40px] py-[16px] border-gray-100 shadow-sm bg-gray-50">
                <div className="flex gap-y-3 md:items-center flex-col md:flex-row">
                  <div className="flex items-center ">
                    <div className="bg-gray-700 text-white p-1 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-xl text-gray-800">
                      SoftRankings
                    </span>
                  </div>
                  <div className="md:ml-[150px]">
                    <span className="text-gray-800 text-2xl font-medium">
                      Admin's Console
                    </span>
                  </div>
                </div>
              </nav>

              <div className="content-container ">
                <ProtectedRoute>{children} </ProtectedRoute>
              </div>
            </main>
          </StoreProvider>
        </ResponsiveScaler>
      </body>
    </html>
  );
}
