"use client";

import { useLinks } from "@/app/hooks/useLinks";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";
interface Props {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  icon: any;
  error: string;
  id: string;
  value: string;
}

export const LinkInput = forwardRef<HTMLInputElement, Props>(function (
  { name, type, label, placeholder, icon, error, id, value },
  ref: any
) {
  const { links, setIsEdited } = useLinks()!;
  const [url, setUrl] = useState(value || "");
  const errorMessageRef = useRef<HTMLSpanElement | any>();
  const emptyMessageRef = useRef<HTMLSpanElement | any>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("");
    const inputValue = e.target.value;
    setUrl(inputValue);
    const link = links.find((link) => link.id === id);
    link!.url = inputValue;
    // console.log(inputValue);
    setIsEdited(true);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const isEmpty = e.target.validity.valueMissing;
    const isTypeInvalid = e.target.validity.typeMismatch;

    if (isEmpty && ref.current && emptyMessageRef.current) {
      ref.current.style.border = "1px solid #FF3939";
      ref.current.style.boxShadow = "none";
      emptyMessageRef.current.style.display = "block";
      ref.current.style.color = "#FF3939";
    } else if (ref.current && emptyMessageRef && isTypeInvalid) {
      ref.current.style.border = "1px solid #FF3939";
      ref.current.style.boxShadow = "none";
      errorMessageRef.current.style.display = "block";
      ref.current.style.color = "#FF3939";
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.setCustomValidity(" ");
    const isEmpty = e.currentTarget.validity.valueMissing;

    if (ref.current) {
      ref.current.style.border = "1px solid #FF3939";
      ref.current.style.boxShadow = "none";
      if (isEmpty && emptyMessageRef.current) {
        emptyMessageRef.current.style.display = "block";
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.border = "";
      ref.current.style.boxShadow = "";
      ref.current.style.paddingRight = "";
      if (emptyMessageRef.current) {
        emptyMessageRef.current.style.display = "";
        errorMessageRef.current.style.display = "";
      }
      ref.current.style.color = "";
    }
  }, [url]);

  return (
    <div className="w-full">
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
      <div className="flex flex-row items-center gap-3 relative">
        <Image
          className="absolute left-3 top-[54%] -translate-y-1/2"
          src={icon}
          alt="link icon"
        />
        <input
          className="input"
          type={type}
          name={name}
          ref={ref}
          placeholder={placeholder}
          id={label}
          defaultValue={value}
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          onInput={handleInput}
          required
        />
        <span
          className="text-red text-xs absolute right-3 hidden"
          ref={errorMessageRef}
        >
          {error}
        </span>
        <span
          className="text-red text-xs absolute right-3 hidden"
          ref={emptyMessageRef}
        >
          Can't be empty
        </span>
      </div>
    </div>
  );
});
