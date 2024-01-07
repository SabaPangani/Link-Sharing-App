"use client";

import envelope from "@/public/envelope.svg";
import person from "@/public/person.svg";
import UploadImage from "./UploadImage";
import { Input } from "@/components/Input";
import { useRef } from "react";

export default function ProfileDetails() {
  const fName = useRef();
  const lName = useRef();
  const email = useRef();
  return (
    <div className="bg-white w-full rounded-xl p-10 pb-3">
      <header className="mb-8">
        <h1 className="text-[32px] font-bold">Profile Details</h1>
        <p className="text-gray">
          Add your details to create a personal touch to your profile.
        </p>
      </header>
      <form className="flex flex-col gap-y-10">
        <UploadImage />
        <div className="bg-[#FAFAFA] rounded-xl p-5 flex flex-col gap-y-3">
          <div className="w-full flex flex-row justify-between items-center">
            <label className="text-gray text-sm mr-[10.8px]">First name*</label>
            <Input
              type="text"
              name="fName"
              error="Invalid name"
              ref={fName}
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
              ref={lName}
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
              ref={email}
              placeholder="e.g. email@example.com"
              label=""
              icon={envelope}
            />
          </div>
        </div>
        <div className="w-full mt-20 h-[94px] bg-white py-[40px] flex justify-end items-center">
          <button className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
