"use client";

import Link from "next/link";
import Image from "next/image";

import logo from "@/public/logo.svg";
import user from "@/public/user.svg";
import link from "@/public/link.svg";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center p-5 rounded-xl">
      <div className="flex flex-row items-center font-bold text-2xl text-dark gap-x-1">
        <Image src={logo} alt="Logo" />
        <h1>devlinks</h1>
      </div>
      <ul className="flex flex-row gap-x-4">
        <Link href="profile-links">
          <li
            className={`flex flex-row items-center gap-x-2 font-semibold text-gray px-[27px] py-[11px] rounded-lg ${
              pathName === "/account/profile-links" ? "bg-light-purple text-purple" : ""
            }`}
          >
            <Image src={link} alt="Link" />
            <span>Links</span>
          </li>
        </Link>
        <Link href="profile-tab">
          <li
            className={`flex flex-row items-center gap-x-2 font-semibold text-gray px-[27px] py-[11px] rounded-lg ${
              pathName === "/account/profile-tab" ? "bg-light-purple text-purple" : ""
            }`}
          >
            <Image src={user} alt="User" />
            <span>Profile Details</span>
          </li>
        </Link>
      </ul>
      <button className="rounded-lg border border-purple px-8 py-3 text-purple font-semibold">
        Preview
      </button>
    </nav>
  );
}
