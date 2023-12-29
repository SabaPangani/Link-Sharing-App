"use client"
import Image from "next/image";
import { ForwardedRef, Reference, forwardRef } from "react";
interface Props {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  icon: any;
}
export const Input = forwardRef(function({ name, type, label, placeholder, icon}: Props, ref: any) {
  const handleFocus = () => {
    if (ref.current != null){
        ref.current.style.border = "1px solid #633CFF"
        ref.current.style.boxShadow = "0px 0px 32px 0px rgba(99, 60, 255, 0.25)"
    }
  } 
  const handleBlur = () => {
    if (ref.current != null){
        ref.current.style.border = "1px solid #D9D9D9"
        ref.current.style.boxShadow = ""
    }
  } 
  return (
    <div>
      <label htmlFor={label} className="text-xs">
        {label}
      </label>
      <div className="flex flex-row items-center gap-3 w-[396px] relative">
        <Image className="absolute left-3 top-1/2 -translate-y-1/2" src={icon} alt="envelope icon" />
        <input
          className="w-full h-12 bg-white justify-start px-10 border border-zinc-300 rounded-lg outline-none mt-1"
          type={type}
          name={name}
          ref={ref}
          placeholder={placeholder}
          id={label}
          onFocusCapture={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
})
