"use client";

import Image from "next/image";
import empty from "@/public/empty.svg";

import { ILink } from "@/app/shared/types/Link";
import LinkComponent from "./Link";
import { useLinks } from "@/app/hooks/useLinks";
import { FormEvent, useState } from "react";
import Loader from "@/components/Loader";
import ResponseModal from "@/components/ResponseModal";
import { useSession } from "next-auth/react";

export default function Links() {
  const { links, addLinks, isLoading: loading, isEdited } = useLinks()!;
  const [isLoading, setIsLoading] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { data: session, status } = useSession();
  console.log(session, status);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const linkSet = new Set();
      const method = isEdited ? "PUT" : "POST";
      const hasDuplicate = links.some((link) => {
        if (linkSet.has(link.platform)) {
          alert("Duplicate links found");
          return true;
        }
        linkSet.add(link.platform);
        return false;
      });

      if (hasDuplicate) {
        setIsDuplicate(hasDuplicate);
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/links", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links }),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit links. Status: ${res.status}`);
      }

      const json = await res.json();

      console.log(json);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white w-full flex flex-col text-dark gap-y-10 self-stretch max-[375px]:px-4 p-10 pb-3 rounded-xl relative">
        <header>
          <h1 className="text-[32px] font-bold max-[400px]:text-[24px]">
            Customize your links
          </h1>
          <p className="text-gray max-[400px]:text-[14px]">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </header>
        {links.length !== 5 ? (
          <button
            className="btn-secondary"
            onClick={() => {
              addLinks();
            }}
          >
            + Add new link
          </button>
        ) : (
          <button
            className="btn-secondary disabled:bg-light-gray disabled:text-gray disabled:border-gray"
            onClick={() => {
              addLinks();
            }}
            disabled
          >
            + Add new link
          </button>
        )}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {loading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              <Loader />
            </div>
          ) : links.length >= 1 ? (
            <ul className="flex flex-col gap-y-5">
              {links.map((link: ILink) => (
                <li key={link.id}>
                  <LinkComponent
                    id={link.id}
                    url={link.url}
                    platform={link.platform}
                    order={link.order}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-y-8 bg-[#FAFAFA] items-center text-center p-20 rounded-xl">
              <Image src={empty} alt="Empty image" />

              <h1 className="text-[32px] font-bold">Let's get you started</h1>
              <p className="text-gray leading-6 w-[488px]">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          )}

          <div className="w-full mt-[291px] flex flex-col justify-end items-end flex-1">
            <button
              className="btn-primary max-md:w-full max-md:justify-center flex justify-end items-end"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {isLoading && <ResponseModal />}
    </>
  );
}
