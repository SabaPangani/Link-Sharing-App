"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavBarPreview() {
  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center p-5 rounded-xl">
      <button className="btn-secondary">Back to Editor</button>
      <button className="btn-primary">Share Link</button>
    </nav>
  );
}
