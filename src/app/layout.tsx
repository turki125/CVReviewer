import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدرب المقابلات",
  description: "تدرّب على مقابلات العمل السعودية بالذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
