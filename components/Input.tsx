"use client"
import Image from "next/image";
import { useRef } from "react";
interface Props {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  icon: any;
}
export default function Input({ name, type, label, placeholder, icon }: Props) {
  const inputRef = useRef();

  const handleFocus = () => {
    if (inputRef.current != null){
        inputRef.current.style.border = "1px solid #633CFF"
        inputRef.current.style.boxShadow = "0px 0px 32px 0px rgba(99, 60, 255, 0.25)"
    }
  } 
  const handleBlur = () => {
    if (inputRef.current != null){
        inputRef.current.style.border = "1px solid #D9D9D9"
        inputRef.current.style.boxShadow = ""
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
          placeholder={placeholder}
          id={label}
          ref={inputRef as any}
          onFocusCapture={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
