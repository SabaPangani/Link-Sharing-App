"use client";

import Image from "next/image";
import empty from "@/public/empty.svg";

import Link from "@/app/shared/types/Link";
import { useState } from "react";
import LinkComponent from "./Link";
import { v4 as uuid } from "uuid";
import { useSession } from "next-auth/react";

export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);
  const { data: session, status } = useSession();
  console.log(session);
  const handleAddLink = () => {
    if (links.length < 5) {
      const newLink = {
        id: uuid(),
        platform: "GitHub",
        url: "",
        order: (links.length + 1).toString(),
        userId: session?.user?.email,
      } as Link;
      setLinks((prev) => [...prev, newLink]);
    }
  };

  const handlePlatformDelete = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    let l = links.length;
    for (let i = 1; i < l; i++) {
      links[i].order = i;
    }
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(links),
    });
    const json = await res.json();
    console.log(json);
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
      {links.length !== 5 ? (
        <button className="btn-secondary" onClick={handleAddLink}>
          + Add new link
        </button>
      ) : (
        <button
          className="btn-secondary disabled:bg-light-gray disabled:text-gray disabled:border-gray"
          onClick={handleAddLink}
          disabled
        >
          + Add new link
        </button>
      )}
      {links.length >= 1 ? (
        <ul className="flex flex-col gap-y-5">
          {links.map((link) => (
            <li key={link.id}>
              <LinkComponent
                links={links}
                id={link.id}
                onPlatformDelete={handlePlatformDelete}
                order={link.order}
              />
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

      <div className="w-full h-[94px] bg-white py-[40px] flex justify-end items-center">
        <button className="btn-primary" type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
