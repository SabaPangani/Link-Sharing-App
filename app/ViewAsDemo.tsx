"use client";
import logo from "@/public/logo.svg";
import { Metadata } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Demo",
  description: "Preview as demo",
};

export default function ViewAsDemo() {
  const router = useRouter();
  const [showDemo, setShowDemo] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (sessionStorage.getItem("demo") !== null || session) {
      router.back();
      setShowDemo(false);
    } else {
      setShowDemo(true);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        email: "demo@gmail.com",
        password: "TestTest1!",
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error("Invalid credentials");
      }

      router.replace("/profile-links");
      router.refresh();
      sessionStorage.setItem("demo", "true");
      setShowDemo(false);
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <>
      {showDemo && (
        <>
          <div className="w-screen h-screen absolute left-0 top-0 opacity-30 bg-black"></div>
          <div className="flex items-center justify-center flex-col gap-y-5 shadow-2xl rounded-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-full max-w-[400px] min-h-[200px] py-10">
            <Image src={logo} alt="logo" width={60} height={60} />
            <p className="text-dark font-semibold text-sm">
              View a demo version or login
            </p>

            <div className="flex items-center">
              <button
                className="btn-primary mr-5 text-sm"
                onClick={handleSubmit}
              >
                View as Demo
              </button>
              <Link
                href={"/login"}
                onClick={() => {
                  sessionStorage.setItem("demo", "false");
                  setShowDemo(false);
                }}
              >
                <button className="btn-secondary py-[10.3px] text-sm">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
