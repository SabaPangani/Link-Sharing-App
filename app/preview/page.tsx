import { redirect } from "next/navigation";
import Card from "./Card";
import NavBarPreview from "./NavBarPreview";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/utils/authOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview",
  description: "Preview profile",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

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
