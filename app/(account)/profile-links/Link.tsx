"use client";

import Image from "next/image";
import link from "@/public/link.svg";
import down from "@/public/down.svg";
import up from "@/public/up.svg";
import { useRef, useState } from "react";
import { useLinks } from "@/app/hooks/useLinks";
import { LinkInput } from "./LinkInput";
const platforms = [
  "Github",
  "Frontend Mentor",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "Codepen",
  "freeCodeCamp",
  "GitLab",
  "Hashnode",
  "Stack Overflow",
];

interface Props {
  id: string;
  order: number;
}
export default function Link({ id, order }: Props) {
  const linkRef = useRef() as React.Ref<HTMLInputElement>;
  const { updateLink, removeLink, links } = useLinks()!;
  const [platform, setPlatform] = useState("GitHub");
  const [open, setOpen] = useState(false);
  const platformIcon = require(`@/public/platform-icons/icon-${platform
    .toLowerCase()
    .replace(" ", "")
    .replace(".", "")}.svg`);

  const handlePlatformChange = (platform: string) => {
    setPlatform(platform);
    updateLink(id, platform);
    setOpen(false);
  };

  return (
    <div className="bg-[#FAFAFA] flex flex-col p-5 gap-y-2 rounded-xl">
      <header className="flex flex-row justify-between text-gray">
        <h1 className="font-bold">
          <span className="font-medium">=</span> Link #{order}
        </h1>
        <button
          onClick={() => {
            removeLink(id);
          }}
        >
          Remove
        </button>
      </header>
      <div className="flex flex-col gap-y-3">
        <div className="w-full relative">
          <span className="text-sm">Platform</span>
          <div
            className="flex flex-row w-full justify-between bg-white rounded-lg px-4 py-3 border border-zinc-300 mt-1 cursor-pointer"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="flex flex-row gap-x-3 items-center">
              <Image
                src={platformIcon}
                width={18}
                height={18}
                alt="Platform icon"
              />
              <span className="text-dark font-medium">{platform}</span>
            </div>
            {open ? (
              <Image src={up} alt="Arrow up" />
            ) : (
              <Image src={down} alt="Arrow down" />
            )}
          </div>

          {open && (
            <div className="absolute top-[5.7rem] no-scrollbar h-96 w-full rounded-xl bg-white border-zinc-300 z-10 overflow-y-scroll shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]">
              <ul className="flex flex-col gap-y-3 px-4 py-3">
                {platforms.map((platform) => {
                  return (
                    <li
                      key={platform}
                      className="flex flex-row gap-x-3 text-dark border-zinc-300 py-3 border-b border-solid cursor-pointer"
                      onClick={(e) => {
                        handlePlatformChange(platform);
                      }}
                    >
                      <Image
                        src={require(`@/public/platform-icons/icon-${platform
                          .toLowerCase()
                          .replace(" ", "")
                          .replace(".", "")}.svg`)}
                        width={18}
                        height={18}
                        alt="Platform icon"
                      />
                      <span>{platform}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div>
          <LinkInput
            type="url"
            name="link"
            error="Invalid link"
            ref={linkRef}
            placeholder="e.g. https://www.github.com/johnappleseed"
            label="Link"
            icon={link}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}
