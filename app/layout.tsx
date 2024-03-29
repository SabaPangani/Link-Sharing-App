import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import { LinkProvider } from "./store/linksContext";
import { DemoProvider } from "./store/demoContext";
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link sharing app",
  description: "Created by Saba Pangani",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DemoProvider>
        <LinkProvider>
          <html lang="en">
            <body
              className={`${instrumentSans.className} w-full max-w-[1440px] mx-auto`}
            >
              {children}
              {/* <div className="text-5xl text-purple font-medium absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">Under maintenance</div> */}
            </body>
          </html>
        </LinkProvider>
      </DemoProvider>
    </AuthProvider>
  );
}
