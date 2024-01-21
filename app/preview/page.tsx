"use client"

import { useSession } from "next-auth/react";
import Card from "./Card";
import NavBarPreview from "./NavBarPreview";

export default function page() {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <>
      <NavBarPreview />
      <header className="bg-purple w-full z-[-1] h-[357px] rounded-b-[32px] absolute top-0 left-1/2 -translate-x-1/2  max-[320px]:bg-white"></header>
      <Card />
    </>
  );
}
