"use client";

import { useLinks } from "@/app/hooks/useLinks";
import Image from "next/image";
import { KeyValuePair } from "tailwindcss/types/config";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import PhoneLink from "../(account)/profile-links/PhoneLink";

export default function Card() {
  const { data: session } = useSession();
  const { links, isLoading } = useLinks()!;

  const bgVariants = {
    github: "#1A1A1A",
    "dev.to": "#333",
    frontendmentor: "#D9D9D9",
    codewars: "#8A1A50",
    twitter: "#43B7E9",
    freecodecamp: "#302267",
    linkedin: "#2D68FF",
    gitlab: "#EB4925",
    youtube: "#EE3939",
    hashnode: "#0330D1",
    facebook: "#2442AC",
    stackoverflow: "#EC7100",
    twitch: "#EE3FC8",
  } as KeyValuePair;

  const handleSignOut = async () => {
    localStorage.removeItem("links");
    sessionStorage.removeItem("demo");
    await signOut();
  };
  return (
    <div className="flex flex-col w-full max-w-[354px] px-12 pb-16 pt-10 bg-white absolute left-1/2 top-[20%] -translate-x-1/2 rounded-3xl shadow-2xl max-[320px]:bg-[#FAFAFA] max-[320px]:shadow-none">
      {isLoading ? (
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
          <Loader />
        </div>
      ) : (
        <>
          <header className="flex flex-col items-center justify-center">
            {session?.user.image !== "false" && (
              <Image
                className="w-24 h-24 rounded-full border-4 border-purple"
                src={session?.user.image!}
                alt="pfp"
                width={30}
                height={30}
              />
            )}
            <h1 className="text-dark text-[32px] font-semibold mt-2">
              {session?.user.name} {session?.user.lastName}
            </h1>
            <p className="text-gray ">{session?.user.email}</p>
          </header>
          {
            <ul className="flex flex-col gap-[20px] justify-center items-center mt-10">
              {links.map((link) => (
                <li>
                  <a href={link.url} target="_blank">
                    <PhoneLink platform={link.platform} />
                  </a>
                </li>
              ))}
            </ul>
          }
          <p className="text-dark font-medium absolute bottom-[10px] left-1/2 -translate-x-1/2 -translate-y-[10px] w-full text-center cursor-pointer">
            Want to{" "}
            <span className="text-purple font-medium" onClick={handleSignOut}>
              Sign out?
            </span>
          </p>
        </>
      )}
    </div>
  );
}
