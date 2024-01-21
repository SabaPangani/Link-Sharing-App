"use client";

import { useSession } from "next-auth/react";
import Card from "./Card";
import NavBarPreview from "./NavBarPreview";
import { redirect } from "next/navigation";
export default function page() {
  const { data: session } = useSession();
  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <NavBarPreview />
      <header className="bg-purple w-full z-[-1] h-[357px] rounded-b-[32px] absolute top-0 left-1/2 -translate-x-1/2  max-[320px]:bg-white"></header>
      <Card />
    </>
  );
}
