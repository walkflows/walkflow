import type { Metadata } from "next";
import { FloatingWidgets } from "@/components/chat/FloatingWidgets";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration";
import { unbounded, manrope, caveat } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WALKFLOW | Web Design & AI Automation",
    template: "%s | WALKFLOW",
  },
  description:
    "Make it easier for customers to choose you. Explore custom websites and practical automation for enquiries, appointments and everyday business tasks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${unbounded.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ScrollRestoration />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
