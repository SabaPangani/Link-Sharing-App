"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function NavBarPreview() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center p-5 rounded-xl">
      <button className="btn-secondary">Back to Editor</button>
      <button className="btn-primary">Share Link</button>
      <button className="btn-primary" onClick={handleSignOut}>Sign out</button>
    </nav>
  );
}
