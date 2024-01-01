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
      <div className="flex flex-col items-center w-full max-w-[476px] justify-center gap-y-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-row items-center font-semibold text-2xl">
          <Image src={Logo} alt="Logo" />
          <h1>devlinks</h1>
        </div>
        <main className="bg-white p-[40px] w-full max-w-[476px] rounded-xl">{children}</main>
      </div>
  );
}
