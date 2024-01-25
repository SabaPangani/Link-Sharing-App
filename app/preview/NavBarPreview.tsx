"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLinks } from "../hooks/useLinks";
import ResponseModal from "@/components/ResponseModal";
import linkSvg from "@/public/link.svg";

export default function NavBarPreview() {
  const router = useRouter();
  const { data: session } = useSession();
  const { setShowModal } = useLinks()!;
  const link = `http://LinkSharingApp.com/example/user/${session?.user.id}`;

  const handleBackRoute = () => {
    router.back();
  };

  const handleLinkShare = () => {
    navigator.clipboard.writeText(link);
    setShowModal(true);
  };
  return (
    <>
      <nav className="bg-white max-[320px]:bg-[#FAFAFA] w-full flex flex-row justify-between items-center p-5 rounded-b-xl">
        <button
          className="btn-secondary py-[10px] max-[350px]:px-5"
          onClick={handleBackRoute}
        >
          Back to Editor
        </button>
        <button
          className="btn-primary py-[10px] max-[350px]:px-5"
          onClick={handleLinkShare}
        >
          Share Link
        </button>
      </nav>

      <ResponseModal
        text="The link has been copied to your clipboard!"
        svg={linkSvg}
      />
    </>
  );
}
