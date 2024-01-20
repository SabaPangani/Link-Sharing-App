"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavBarPreview() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
  };
  const handleBackRoute = () => {
    router.back();
  };
  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center p-5 rounded-xl">
      <button className="btn-secondary" onClick={handleBackRoute}>
        Back to Editor
      </button>
      <button className="btn-primary">Share Link</button>
      <button className="btn-primary" onClick={handleSignOut}>
        Sign out
      </button>
    </nav>
  );
}
