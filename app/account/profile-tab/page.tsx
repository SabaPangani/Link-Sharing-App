import Image from "next/image";
import empty from "@/public/empty.svg";
import PhoneMockup from "../profile-links/PhoneMockup";
import ProfileDetails from "./ProfileDetails";
export default function ProfileLinks() {
  return (
    <div className="flex flex-row my-5 gap-x-5">
      <PhoneMockup />
      <ProfileDetails />
    </div>
  );
}
