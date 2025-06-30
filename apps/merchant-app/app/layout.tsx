import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { LayoutShell } from "../components/LayoutShell"; // 👈 new wrapper
import { Toaster } from "react-hot-toast";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LayoutShell>
            <Toaster
              position="top-center"
              toastOptions={{
              style: {
              background: "#111827", // Tailwind: bg-gray-900
              color: "#fff",
              borderRadius: "10px",
              fontWeight: "500",
              fontSize: "14px",
              },
              success: {
              iconTheme: {
              primary: "#22c55e", // green-500
              secondary: "#dcfce7", // green-100
              },
              },
              error: {
              iconTheme: {
              primary: "#ef4444", // red-500
              secondary: "#fee2e2", // red-100
      },
    },
  }}
/>

            {children}
          </LayoutShell> 
        </Providers>
      </body>
    </html>
  );
}

