"use client";

import Link from "next/link";
import Image from "next/image";

import logo from "@/public/logo.svg";
import LinkSvg from "@/components/svgs/Link";
import eye from "@/public/eye.svg";
import UserSvg from "@/components/svgs/User";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center p-5 rounded-xl">
      <div className="flex flex-row items-center font-bold text-2xl text-dark gap-x-1">
        <Image src={logo} alt="Logo" />
        <Link href="profile-links">
          <h1 className="max-md:hidden">devlinks</h1>
        </Link>
      </div>
      <ul className="flex flex-row items-center gap-x-4 max-md:gap-x-0 max-[500px]:gap-x-2">
        <Link href="profile-links">
          <li
            className={`flex flex-row items-center gap-x-2 font-semibold text-gray px-[27px] py-[11px] rounded-lg max-md:px-[15px] ${
              pathName === "/profile-links" ? "bg-light-purple text-purple" : ""
            }`}
          >
            {pathName === "/profile-links" ? (
              <LinkSvg fill="#633CFF" />
            ) : (
              <LinkSvg fill="#737373" />
            )}
            <span className="max-[500px]:hidden">Links</span>
          </li>
        </Link>
        <Link href="profile-details">
          <li
            className={`flex flex-row items-center gap-x-2 font-semibold text-gray px-[27px] py-[11px] rounded-lg max-md:px-[15px] ${
              pathName === "/profile-details"
                ? "bg-light-purple text-purple"
                : ""
            }`}
          >
            {pathName === "/profile-details" ? (
              <UserSvg fill="#633CFF" />
            ) : (
              <UserSvg fill="#737373" />
            )}
            <span className="max-[500px]:hidden">Profile Details</span>
          </li>
        </Link>
      </ul>
      <Link href={"preview"}>
        <button className="btn-secondary max-[500px]:px-4">
          <span className="max-[500px]:hidden">Preview</span>
          <Image
            className="hidden max-[500px]:block"
            src={eye}
            alt="preview icon"
          />
        </button>
      </Link>
    </nav>
  );
}
