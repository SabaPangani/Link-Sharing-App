"use client";

import { useLinks } from "@/app/hooks/useLinks";
import phoneMockup from "@/public/phoneMockup.svg";
import Image from "next/image";
import PhoneLink from "./PhoneLink";
import PhoneDetails from "./PhoneDetails";
export default function PhoneMockup() {
  const { links } = useLinks()!;

  return (
    <div className="rounded-xl w-full max-w-[560px] bg-white flex justify-center items-center py-28 relative max-md:hidden">
      <Image src={phoneMockup} alt="Phone mockup" />
      <PhoneDetails />
      <ul className="flex flex-col gap-[20px] justify-center absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[39px]">
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank">
              <PhoneLink platform={link.platform} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
