import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import { LinkProvider } from "./store/linksContext";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/utils/authOptions";
import { redirect } from "next/navigation";
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LinkProvider>
        <html lang="en">
          <body
            className={`${instrumentSans.className} w-full max-w-[1440px] mx-auto`}
          >
            {children}
          </body>
        </html>
      </LinkProvider>
    </AuthProvider>
  );
}
