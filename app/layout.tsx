import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/PlanProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description:
    "Train hard, log honest. A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html 
    lang="en" 
    data-theme="fitlog" 
    className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen bg-base-100 font-body text-base-content antialiased">
        <PlanProvider>


          <Navbar />
          <main className="min-h-[78vh]">{children}</main>

          <Footer />

        </PlanProvider>
      </body>
    </html>
  );
}
