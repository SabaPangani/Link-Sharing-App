import Image from "next/image";
import empty from "@/public/empty.svg";
export default function Links() {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="bg-white flex flex-col text-dark gap-y-10 self-stretch p-10 rounded-t-xl">
        <header>
          <h1 className="text-[32px] font-bold">Customize your links</h1>
          <p className="text-gray">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </header>
        <button className="btn-secondary">+ Add new link</button>
        <div className="flex flex-col gap-y-8 bg-[#FAFAFA] items-center text-center p-20 rounded-xl">
          <Image src={empty} alt="Empty image" />

          <h1 className="text-[32px] font-bold">Let's get you starterd</h1>
          <p className="text-gray leading-6 w-[488px]">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </p>
        </div>
      </div>
      <div className="bg-white h-full flex justify-end items-center pr-8 rounded-b-xl">
        <button className="btn-primary disabled:opacity-35 disabled:hover:bg-purple disabled:hover:shadow-none" disabled>
          Save
        </button>
      </div>
    </div>
  );
}
