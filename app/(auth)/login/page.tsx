"use client";
import Link from "next/link";

import { Input } from "@/components/Input";

import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.svg";

import { FormEventHandler, useEffect, useRef, useState } from "react";

import { signIn, useSession } from "next-auth/react";
export default function Login() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const isEmailValid = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  console.log(session, status);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      if (!isEmailValid(email)) {
        throw new Error("Invalid email");
      }
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <>
      <header>
        <h1 className="text-[32px] font-bold text-dark max-sm:text-2xl">Login</h1>
        <p className="text-gray mb-8 max-sm:text-sm">
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
        <button className="btn-primary my-3" type="submit">
          Login
        </button>
        <Link href={"/signup"}>
          <p className="text-center text-gray">
            Don’t have an account?{" "}
            <span className="text-purple font-medium cursor-pointer max-sm:px-6">
              Create account
            </span>
          </p>
        </Link>
      </form>
    </>
  );
}
