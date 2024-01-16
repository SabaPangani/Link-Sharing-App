import Image from "next/image";
import arrow from "@/public/arrowRight.svg";
import { KeyValuePair } from "tailwindcss/types/config";

export default function PhoneLink({ platform }: { platform: string }) {
  const platformClass = platform
    .toLowerCase()
    .replace(" ", "")
    .replace(".", "");

  const bgVariants = {
    github: "#1A1A1A",
    "dev.to": "#333",
    frontendmentor: "#D9D9D9",
    codewars: "#8A1A50",
    twitter: "#43B7E9",
    freecodecamp: "#302267",
    linkedin: "#2D68FF",
    gitlab: "#EB4925",
    youtube: "#EE3939",
    hashnode: "#0330D1",
    facebook: "#2442AC",
    stackoverflow: "#EC7100",
    twitch: "#EE3FC8",
  } as KeyValuePair;

  return (
    <div
      className={`w-[237px] flex flex-row justify-between items-center px-4 py-2.5 rounded-lg bg-[${bgVariants[platformClass]}]`}
    >
      <div className={`flex flex-row items-center gap-x-2`}>
        <Image
          src={require(`@/public/linkbox-icons/${platformClass}.svg`)}
          width={20}
          height={20}
          alt="Platform icon"
        />
        <span className="text-[#FFF]">{platform}</span>
      </div>
      <Image src={arrow} alt="Arrow" />
    </div>
  );
}
