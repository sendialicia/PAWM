import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "Lab Biomedis",
  description: "Created by Sendi and Velicia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
