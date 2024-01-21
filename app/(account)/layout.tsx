import { Metadata } from "next";
import NavBar from "./NavBar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/utils/authOptions";
export const metadata: Metadata = {
  title: "Account",
  description: "Customize links",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);
  if (!session) {
    return redirect("/login");
  }
  return (
    <div>
      <NavBar />
      <main className="px-3">{children}</main>
    </div>
  );
}
