"use client";

import envelope from "@/public/envelope.svg";
import person from "@/public/person.svg";
import UploadImage from "./UploadImage";
import { Input } from "@/components/Input";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfileDetails() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const fNameRef = useRef() as React.Ref<HTMLInputElement>;
  const lNameRef = useRef() as React.Ref<HTMLInputElement>;
  const emailRef = useRef() as React.Ref<HTMLInputElement>;
  const imgRef = useRef() as React.Ref<HTMLInputElement>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error(`Failed to fetch data Status: ${res.status}`);
        }

        const { result } = await res.json();

        fNameRef.current.value = result?.name || "";
        lNameRef.current.value = result?.lastName || "";
        emailRef.current.value = result?.email || "";

        imgRef.current.src = result?.image || "";

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const email = emailRef.current.value;
    const image = imgRef.current.value;
    console.log(image);
    console.log(imgRef);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uId: session?.user?.email,
          fName,
          lName,
          email,
          image,
        }),
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
    <div className="bg-white w-full rounded-xl p-10 pb-3 relative">
      <header className="mb-8">
        <h1 className="text-[32px] font-bold">Profile Details</h1>
        <p className="text-gray">
          Add your details to create a personal touch to your profile.
        </p>
      </header>
      <form className="flex flex-col gap-y-10" onSubmit={handleSubmit}>
        <UploadImage inputRef={imgRef} />
        <div className="bg-[#FAFAFA] rounded-xl p-5 flex flex-col gap-y-3">
          <div className="w-full flex flex-row justify-between items-center">
            <label className="text-gray text-sm mr-[10.8px]">First name*</label>
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
          <div className="w-full flex flex-row justify-between items-center">
            <label className="text-gray text-sm mr-[10.8px]">First name*</label>
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
          <div className="w-full flex flex-row justify-between items-center">
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
        <button
          className="btn-primary absolute right-10 bottom-5"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
