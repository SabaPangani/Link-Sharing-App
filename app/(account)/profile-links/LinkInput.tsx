"use client";
import { useLinks } from "@/app/hooks/useLinks";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
interface Props {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  icon: any;
  error: string;
  id: string;
}
export const LinkInput = forwardRef(function (
  { name, type, label, placeholder, icon, error, id }: Props,
  ref: React.Ref<HTMLInputElement>
) {
  const { links } = useLinks()!;
  const [url, setUrl] = useState("");
  const errorMessageRef = useRef();
  const emptyMessageRef = useRef();

  const handleChange = (e: any) => {
    e.target.setCustomValidity("");
    setUrl(e.target.value);
    const link = links.find((link) => link.id === id);
    console.log(link);
    link!.url = url;
    console.log(link);
  };

  const handleBlur = (e: any) => {
    const isEmpty = e.target.validity.valueMissing;
    const isTypeInvalid = e.target.validity.typeMismatch;

    if (isEmpty) {
      ref.current.style.border = "1px solid #FF3939";
      ref.current.style.boxShadow = "none";
      emptyMessageRef.current.style.display = "block";
      ref.current.style.color = "#FF3939";
    } else if (isTypeInvalid) {
      ref.current.style.border = "1px solid #FF3939";
      ref.current.style.boxShadow = "none";
      errorMessageRef.current.style.display = "block";
      ref.current.style.color = "#FF3939";
    }
  };

  const handleInvalid = (e: any) => {
    e.target.setCustomValidity(" ");
    const isEmpty = e.target.validity.valueMissing;
    ref.current.style.border = "1px solid #FF3939";
    ref.current.style.boxShadow = "none";
    if (isEmpty) {
      emptyMessageRef.current.style.display = "block";
    }
  };

  useEffect(() => {
    ref.current.style.border = "";
    ref.current.style.boxShadow = "";
    ref.current.style.paddingRight = "";
    emptyMessageRef.current.style.display = "";
    errorMessageRef.current.style.display = "";
    ref.current.style.color = "";
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
          onChange={handleChange}
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          required
        />
        <span
          className="text-red text-xs absolute right-3 hidden"
          ref={errorMessageRef as any}
        >
          {error}
        </span>
        <span
          className="text-red text-xs absolute right-3 hidden"
          ref={emptyMessageRef as any}
        >
          Can't be empty
        </span>
      </div>
    </div>
  );
});
