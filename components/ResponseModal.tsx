import save from "@/public/save.svg";
import Image from "next/image";
export default function ResponseModal() {
  return (
    <div className="flex flex-row gap-2 py-4 px-6 rounded-xl bg-dark absolute left-1/2 -translate-x-1/2 bottom-10 animate-pulse">
      <Image src={save} alt="save image" />
      <span className="font-medium text-light-gray">Your changes have been successfully saved!</span>
    </div>
  );
}
