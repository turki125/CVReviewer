import type { Metadata } from "next";
import { PageTransition } from "./components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "تاهيل Taaheel",
  description: "تدرّب على مقابلات العمل السعودية بالذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
