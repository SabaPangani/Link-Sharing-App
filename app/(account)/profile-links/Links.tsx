"use client";

import Image from "next/image";
import empty from "@/public/empty.svg";

import { ILink } from "@/app/shared/types/Link";
import LinkComponent from "./Link";
import { useLinks } from "@/app/hooks/useLinks";
import { FormEvent, useState } from "react";
import Loader from "@/components/Loader";
import ResponseModal from "@/components/ResponseModal";
import save from "@/public/save.svg";
import { useDemo } from "@/app/hooks/useDemo";
import { signOut } from "next-auth/react";

export default function Links() {
  const {
    links,
    addLinks,
    isLoading: loading,
    isEdited,
    setShowModal,
  } = useLinks()!;

  const { isDemo, handleMouseEnter, handleMouseLeave, isMouseEntered } =
    useDemo()!;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = isEdited ? "PUT" : "POST";

      const res = await fetch("/api/links", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links }),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit links. Status: ${res.status}`);
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignout = async () => {
    sessionStorage.clear();
    await signOut();
  };

  return (
    <>
      <div className="bg-white min-h-[856px] w-full flex flex-col text-dark gap-y-10 max-[375px]:px-4 p-10 pb-3 rounded-xl relative z-10">
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
          className="flex min-h-[600px] flex-col justify-between max-[320px]:items-center max-[1252px]:min-h-[550px] max-[856px]:min-h-[525px] max-[778px]:min-h-[464px] max-md:min-h-[600px]"
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
            <div className="w-full max-h-[469px] flex flex-col flex-1 gap-y-8 bg-[#FAFAFA] items-center text-center p-10 rounded-xl max-[1000px]:px-2 max-md:p-4 max-md:py-16">
              <Image src={empty} alt="Empty image" />

              <h1 className="text-[32px] font-bold max-[1000px]:text-[26px]">
                Let's get you started
              </h1>
              <p className="text-gray leading-6 max-w-[488px] max-[1000px]:text-sm">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          )}

          <div
            className="w-full flex flex-col justify-end items-end transition-all duration-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isMouseEntered && isDemo && (
              <p
                className="text-purple font-semibold text-xs bg-light-purple rounded-md px-3 py-2"
                onClick={handleSignout}
              >
                For full access{" "}
                <span className="underline cursor-pointer">Register</span>
              </p>
            )}
            <button
              className="btn-primary max-md:w-full mt-6 mb-3"
              type="submit"
              disabled={isLoading || links.length <= 0 || !isEdited || isDemo}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <ResponseModal
        text="Your changes have been successfully saved!"
        svg={save}
      />
    </>
  );
}
