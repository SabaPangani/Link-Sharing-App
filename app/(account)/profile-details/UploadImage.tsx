import Image from "next/image";
import image from "@/public/image.svg";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function UploadImage({
  url,
  onSetImageUrl,
}: {
  url: string | undefined;
  onSetImageUrl: (url: string) => void;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(url);
  }, [url]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0];
    if (!uploadedImage) return;
    const url = URL.createObjectURL(uploadedImage);

    onSetImageUrl(url);

    console.log(url);
  };

  return (
    <section className="bg-[#FAFAFA] rounded-xl flex flex-row max-[500px]:flex-col max-[430px]:items-start items-center p-5 self-stretch justify-between gap-4 ">
      <h1 className="text-gray text-sm">Profile picture</h1>
      <label
        htmlFor="inputFile"
        className="flex flex-col items-center justify-center rounded-xl bg-light-purple pt-[61px] pr-[38px] pb-[60px] pl-[39px] cursor-pointer"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
        }}
      >
        <input
          className="hidden"
          id="inputFile"
          type="file"
          accept="image/png, image/jpeg"
          name="profileAvatar"
          onChange={handleFileChange}
        />
        <Image src={image} alt="Image logo" />
        <span className="mt-1 text-purple font-bold text-center">
          + Upload Image
        </span>
      </label>
      <p className="text-xs text-gray w-[215px]">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </section>
  );
}

// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const uploadedImage = e.target.files?.[0];
//   if (!uploadedImage) return;

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const imageUrl = e.target?.result as string;
//     const dataURL = `data:image/jpeg;base64,${btoa(imageUrl)}`;
//     onSetImageUrl(dataURL);
//   };
//   reader.readAsBinaryString(uploadedImage);
// };
