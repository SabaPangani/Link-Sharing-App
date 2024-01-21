import { useLinks } from "@/app/hooks/useLinks";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";

export default function PhoneDetails() {
  const { data: session } = useSession();
  const { links, isLoading } = useLinks()!;

  return (
    <div className="absolute text-center top-[288px]">
      <header>
        <Image src={session?.user.image as string} alt="pfp" width={30} height={30} />
        <h1 className="text-dark text-lg font-semibold bg-white px-2 mb-2">
          {session?.user.name} {session?.user.lastName}
        </h1>
        <p className="text-gray text-sm bg-white px-2">{session?.user.email}</p>
      </header>
    </div>
  );
}
