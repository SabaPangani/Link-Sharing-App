"use client";
import Link from "next/link";

import { Input } from "@/components/Input";

import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.svg";

import { FormEventHandler } from "react";

import { signIn } from "next-auth/react";

export default function Login() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: "john@gmail.com",
      password: "sabasaba",
      redirect: false,
    });

    console.log(res);
  };

  return (
    <>
      <header>
        <h1 className="text-[32px] font-bold text-dark">Login</h1>
        <p className="text-gray mb-8">
          Add your details below to get back into the app
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
          label={"Password"}
          placeholder="Enter your password"
        />
        <button className="btn-primary my-3" type="submit">
          Login
        </button>
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
