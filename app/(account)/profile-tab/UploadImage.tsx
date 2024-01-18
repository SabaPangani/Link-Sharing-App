import image from "@/public/image.svg";
import Image from "next/image";
import React from "react";

export default function UploadImage({
  inputRef,
}: {
  inputRef: React.Ref<HTMLInputElement>;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected file:", selectedFile);
  };

  return (
    <section className="bg-[#FAFAFA] rounded-xl flex flex-row items-center p-5 self-stretch justify-between gap-4">
      <h1 className="text-gray text-sm">Profile picture</h1>
      <label
        htmlFor="inputFile"
        className="flex flex-col items-center justify-center rounded-xl bg-light-purple pt-[61px] pr-[38px] pb-[60px] pl-[39px] cursor-pointer"
      >
        <input
          className="hidden"
          id="inputFile"
          type="file"
          accept="image/png, image/jpeg"
          name="profileAvatar"
          ref={inputRef}
          onChange={handleFileChange}
        />
        <Image src={image} alt="Image logo" />
        <span className="mt-1 text-purple font-bold">+ Upload Image</span>
      </label>
      <p className="text-xs text-gray w-[215px]">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </section>
  );
}
