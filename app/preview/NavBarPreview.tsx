"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavBarPreview() {
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem("links");
    sessionStorage.removeItem("demo");
    await signOut();
  };
  const handleBackRoute = () => {
    router.back();
  };
  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center p-5 rounded-b-xl">
      <button
        className="btn-secondary py-[10px] max-[350px]:px-5"
        onClick={handleBackRoute}
      >
        Back to Editor
      </button>
      <button className="btn-primary py-[10px] max-[350px]:px-5">
        Share Link
      </button>
      <button className="btn-primary" onClick={handleSignOut}>
        Sign out
      </button>
    </nav>
  );
}
