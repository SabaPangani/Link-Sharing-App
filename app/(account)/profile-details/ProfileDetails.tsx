"use client";

import envelope from "@/public/envelope.svg";
import person from "@/public/person.svg";
import UploadImage from "./UploadImage";
import { Input } from "@/components/Input";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfileDetails() {
  const { data: session, status, update } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("false");
  const fNameRef = useRef() as any;
  const lNameRef = useRef() as any;
  const emailRef = useRef() as any;
  const imgRef = useRef() as any;

  useEffect(() => {
    console.log(session?.user, status);
    setIsLoading(true);
    fNameRef.current.value = session?.user.name || "";
    lNameRef.current.value = session?.user.lastName || "";
    emailRef.current.value = session?.user.email || "";

    setIsLoading(false);
  }, [session]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const email = emailRef.current.value;
    console.log(imgRef);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uId: session?.user?.id,
          fName,
          lName,
          email,
          image: imageUrl,
        }), 
      });

      await update({
        name: fName,
        lastName: lName,
        email,
        image: imageUrl,
      });
      if (!res.ok) {
        throw new Error(`Failed to submit links. Status: ${res.status}`);
      }

      const json = await res.json();
      console.log(json);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="bg-white h-[856px] w-full rounded-xl p-10 pb-3 relative max-[375px]:px-4">
      <header className="mb-8">
        <h1 className="text-[32px] font-bold max-[400px]:text-[24px] text-dark">
          Profile Details
        </h1>
        <p className="text-gray">
          Add your details to create a personal touch to your profile.
        </p>
      </header>
      <form className="flex flex-col gap-y-10" onSubmit={handleSubmit}>
        <UploadImage url={imageUrl} onSetImageUrl={setImageUrl} />
        <div className="bg-[#FAFAFA] rounded-xl p-5 flex flex-col gap-y-3">
          <div className="w-full flex flex-row justify-between items-center max-[430px]:flex-col max-[430px]:items-start">
            <label className="text-gray text-sm mr-[10.8px] max-[430px]:text-start">
              First name*
            </label>
            <Input
              type="text"
              name="fName"
              error="Invalid name"
              ref={fNameRef}
              placeholder="e.g. John"
              label=""
              icon={person}
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center max-[430px]:flex-col max-[430px]:items-start">
            <label className="text-gray text-sm mr-[10.8px]">Last name*</label>
            <Input
              type="text"
              name="lName"
              error="Invalid last name"
              ref={lNameRef}
              placeholder="e.g. Appleseed"
              label=""
              icon={person}
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center max-[430px]:flex-col max-[430px]:items-start">
            <label className="text-gray text-sm mr-10">Email</label>
            <Input
              type="email"
              name="lName"
              error="Invalid email"
              ref={emailRef}
              placeholder="e.g. email@example.com"
              label=""
              icon={envelope}
            />
          </div>
        </div>
        <div className="w-full mt-24 flex flex-col justify-end items-end flex-1">
          <button
            className="btn-primary max-md:w-full max-md:justify-center flex justify-end items-end"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
