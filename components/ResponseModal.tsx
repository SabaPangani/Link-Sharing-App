import { useLinks } from "@/app/hooks/useLinks";
import save from "@/public/save.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function ResponseModal({ text }: { text: string }) {
  const { showModal, setShowModal } = useLinks()!;

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    }
  }, [showModal]);
  return (
    <>
      {showModal && (
        <div className="flex flex-row gap-2 py-4 px-6 rounded-xl bg-dark absolute left-1/2 -translate-x-1/2 bottom-10 animate-pulse">
          <Image src={save} alt="save image" />
          <span className="font-medium text-light-gray">{text}</span>
        </div>
      )}
    </>
  );
}
