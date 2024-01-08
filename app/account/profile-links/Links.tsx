"use client";

import Image from "next/image";
import empty from "@/public/empty.svg";

import Link from "@/app/shared/types/Link";
import { useState } from "react";
import LinkComponent from "./Link";
export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);

  const handleAddLink = () => {
    const newLink = { platform: "GitHub", link: "" };
    setLinks((prev) => ({
      ...prev,
      newLink,
    }));
  };
  return (
    <div className="bg-white w-full flex flex-col text-dark gap-y-10 self-stretch p-10 pb-3 rounded-xl">
      <header>
        <h1 className="text-[32px] font-bold">Customize your links</h1>
        <p className="text-gray">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </header>
      <button className="btn-secondary" onClick={handleAddLink}>
        + Add new link
      </button>
      {links.length >= 1 ? (
        <ul>
          {links.map((link) => (
            <li key={link.platform}>
              <LinkComponent />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-y-8 bg-[#FAFAFA] items-center text-center p-20 rounded-xl">
          <Image src={empty} alt="Empty image" />

          <h1 className="text-[32px] font-bold">Let's get you starterd</h1>
          <p className="text-gray leading-6 w-[488px]">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </p>
        </div>
      )}

      <LinkComponent />
      <div className="w-full h-[94px] bg-white py-[40px] flex justify-end items-center">
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
}
