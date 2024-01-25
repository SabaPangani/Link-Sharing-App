import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Card from "./Card";
import NavBarPreview from "./NavBarPreview";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/utils/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session);
  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      <NavBarPreview />
      <header className="bg-purple w-full z-[-1] h-[357px] rounded-b-[32px] absolute top-0 left-1/2 -translate-x-1/2  max-[320px]:bg-[#FAFAFA]"></header>
      <Card />
    </>
  );
}
