import { Metadata } from "next";
import NavBar from "./NavBar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/utils/authOptions";
import PhoneMockup from "./profile-links/PhoneMockup";
import { Suspense } from "react";
import Loading from "./loading";
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

  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="p-5 max-[320px]:p-0">
      <NavBar />
      <main className="py-3 max-[320px]:p-3 w-full flex flex-row justify-start items-start gap-x-5">
        <Suspense fallback={<Loading />}>
          <PhoneMockup />
          {children}
        </Suspense>
      </main>
    </div>
  );
}
