"use client";

import { useLinks } from "@/app/hooks/useLinks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { KeyValuePair } from "tailwindcss/types/config";
import arrow from "@/public/arrowRight.svg";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function Card() {
  // const [userData, setUserData] = useState([]) as any;
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

  return (
    <div className="flex flex-col w-full max-w-[354px] px-12 py-16 bg-white absolute left-1/2 top-[20%] -translate-x-1/2 rounded-3xl">
      {isLoading ? (
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
          <Loader />
        </div>
      ) : (
        <>
          <header className="flex flex-col items-center justify-center">
            {/* <Image
          src={session?.user.image as any}
          alt="Profile picture"
          width={30}
          height={30}
        /> */}
            <h1 className="text-dark text-[32px] font-semibold">
              {session?.user.name}
            </h1>
            <p className="text-gray ">{session?.user.email}</p>
          </header>
          {
            <ul className="flex flex-col gap-[20px] justify-center items-center mt-16">
              {links.map((link) => (
                <li key={link.id}>
                  <div
                    style={{
                      backgroundColor:
                        bgVariants[
                          link.platform
                            .toLowerCase()
                            .replace(" ", "")
                            .replace(".", "")
                        ],
                    }}
                    className={`w-[237px] flex flex-row justify-between items-center p-4 rounded-lg`}
                  >
                    <div className={`flex flex-row items-center gap-x-2`}>
                      <Image
                        src={require(`@/public/linkbox-icons/${link.platform
                          .toLowerCase()
                          .replace(" ", "")
                          .replace(".", "")}.svg`)}
                        width={20}
                        height={20}
                        alt="Platform icon"
                      />
                      <span className="text-[#FFF]">{link.platform}</span>
                    </div>
                    <Image src={arrow} alt="Arrow" />
                  </div>
                </li>
              ))}
            </ul>
          }
        </>
      )}
    </div>
  );
}
