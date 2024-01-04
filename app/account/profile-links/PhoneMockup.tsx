import phoneMockup from "@/public/phoneMockup.svg";
import Image from "next/image";
export default function PhoneMockup() {
  return (
    <div className="rounded-xl w-full max-w-[560px] bg-white flex justify-center items-center py-28">
      <Image src={phoneMockup} alt="Phone mockup" />
    </div>
  );
}
