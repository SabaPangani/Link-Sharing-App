"use client";
import Link from "next/link";

import { Input } from "@/components/Input";

import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.svg";
import { FormEventHandler, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isWeakPassword, setisWeakPassword] = useState(false);
  const emailRef = useRef() as any;
  const passwordRef = useRef() as any;
  const confirmPasswordRef = useRef() as any;
  const passwordsDontMatchRef = useRef() as any;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setisWeakPassword(false);
    passwordsDontMatchRef.current.style.display = "none";
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      if (password !== confirmPasswordRef.current.value) {
        passwordsDontMatchRef.current.style.display = "block";
        throw new Error("Passwords don't match");
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.log(json.err);
        if (json.err === "Weak password") {
          setisWeakPassword(true);
        }
        setIsLoading(false);
        throw new Error("Invalid credentials");
      }

      router.push("/login");
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <>
      <header>
        <h1 className="text-[32px] font-bold text-dark max-sm:text-2xl">
          Create account
        </h1>
        <p className="text-gray mb-8 max-sm:text-sm">
          Let’s get you started sharing your links!
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 relative">
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
          type={"password"}
          label={"Create password"}
          error="Invalid password"
          placeholder="Use strong password"
          ref={passwordRef}
        />
        <Input
          name="password"
          icon={lock}
          type={"password"}
          label={"Confirm password"}
          error={"Passwords don't match"}
          placeholder="Use strong password"
          ref={confirmPasswordRef}
        />
        {isWeakPassword && <p className="text-red text-sm">Weak password</p>}
        <p
          className="text-red text-sm hidden"
          ref={passwordsDontMatchRef as any}
        >
          Passwords doesn't match
        </p>
        <p className="text-xs text-gray">
          Password must contain at least 8 characters, symbol and number
        </p>
        <button className="btn-primary my-3" type="submit" disabled={isLoading}>
          Create new account
        </button>
        <p className="text-center text-gray max-sm:px-6">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-purple font-medium cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </form>
    </>
  );
}
