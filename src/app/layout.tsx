import type { Metadata } from "next/types";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/layout/Header";
import localFont from "next/font/local";
import ChatModalWrapper from "@/components/chat/ChatModalWrapper";
import { cookies } from "next/headers";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Game-Bid",
  description: "Game-Bid 경매 플랫폼 입니다.",
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const initialAuth = !!token;

  return (
    <html lang="ko">
      <body className={`antialiased ${pretendard.className}`}>
        <QueryProvider>
          <AuthProvider initialAuth={initialAuth}>
            <Header />
            <main className="mt-[82px]">{children}</main>
            <ChatModalWrapper />
            <ReactQueryDevtools />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
