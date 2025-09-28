import "./global.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COBA-ION — Company Bankruptcy Prediction",
  description: "AI-driven company bankruptcy prediction and explanations",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.className} bg-[#0b0f17] text-white min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
