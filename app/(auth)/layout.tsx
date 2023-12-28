import type { Metadata } from "next";

import Logo from "@/public/logo.svg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login and register",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-col items-center justify-center gap-y-10 my-[300px] max-auto">
        <div className="flex flex-row items-center font-semibold text-2xl">
          <Image src={Logo} alt="Logo" />
          <h1>devlinks</h1>
        </div>
        <main className="bg-white p-[40px] w-[476px] rounded-xl">{children}</main>
      </div>
  );
}
