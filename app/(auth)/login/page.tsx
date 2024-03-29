"use client";
import Link from "next/link";

import { Input } from "@/components/Input";

import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.svg";

import { FormEventHandler, useRef, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef() as any;
  const passwordRef = useRef() as any;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setError(false);
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef?.current.value.toLowerCase();
    const password = passwordRef?.current?.value;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error("Invalid credentials");
      }

      router.push("/profile-links");
      sessionStorage.setItem("demo", "false");
      setIsLoading(false);
    } catch (err: any) {
      setError(true);
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <>
      <header>
        <h1 className="text-[32px] font-bold text-dark max-sm:text-2xl mb-3">
          Login
        </h1>
        <p className="text-gray mb-8 max-sm:text-sm w-full">
          Add your details below to get back into the app
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <Input
          name="email"
          icon={envelope}
          type="email"
          label="Email Address"
          error="Invalid email"
          placeholder="e.g. alex@email.com"
          ref={emailRef}
        />
        <Input
          name="password"
          icon={lock}
          type="password"
          label="Password"
          error="Invalid password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        {/* <Link href={"profile-links"}> */}
        <button className="btn-primary my-3" type="submit" disabled={isLoading}>
          Login
        </button>
        {/* </Link> */}
        {error == true && (
          <p className="text-red font-medium">
            Invalid credentials, please check again
          </p>
        )}
        <Link href={"/signup"}>
          <p className="text-center text-gray">
            Don’t have an account?{" "}
            <span className="text-purple font-medium cursor-pointer">
              Create account
            </span>
          </p>
        </Link>
      </form>
    </>
  );
}
