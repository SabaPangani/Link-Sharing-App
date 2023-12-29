"use client";
import Link from "next/link";

import Input from "@/components/Input";

import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.svg";
import { FormEventHandler } from "react";
export default function Login() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
        />
        <Input
          name="password"
          icon={lock}
          type={"password"}
          label={"Create password"}
          placeholder="At least 8 characters"
        />
        <Input
          name="password"
          icon={lock}
          type={"password"}
          label={"Confirm password"}
          placeholder="At least 8 characters"
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
