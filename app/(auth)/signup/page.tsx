"use client";
import Link from "next/link";

import { Input } from "@/components/Input";

import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.svg";
import { FormEventHandler, useRef, useState } from "react";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassword = useRef();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      console.log(json, "res");
      if (!res.ok) {
        console.log(json.statusText);
      }
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <>
      <header>
        <h1 className="text-[32px] font-bold text-dark">Create account</h1>
        <p className="text-gray mb-8">
          Let’s get you started sharing your links!
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <Input
          name="email"
          icon={envelope}
          type={"text"}
          label={"Email Address"}
          placeholder="e.g. alex@email.com"
          ref={emailRef}
        />
        <Input
          name="password"
          icon={lock}
          type={"password"}
          label={"Create password"}
          placeholder="At least 8 characters"
          ref={passwordRef}
        />
        <Input
          name="password"
          icon={lock}
          type={"password"}
          label={"Confirm password"}
          placeholder="At least 8 characters"
          ref={confirmPassword}
        />
        <p className="text-xs text-gray">
          Password must contain at least 8 characters
        </p>
        <button className="btn-primary my-3" type="submit">
          Create new account
        </button>
        <p className="text-center text-gray">
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
