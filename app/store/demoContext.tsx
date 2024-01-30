"use client";

import * as React from "react";
import { DemoContextType } from "../shared/types/Demo";

export const DemoContext = React.createContext<DemoContextType | null>(null);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDemo, setIsDemo] = React.useState(false);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  React.useEffect(() => {
    setIsDemo(sessionStorage.getItem("demo") == "true" ? true : false);
    console.log(isDemo);
  }, []);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
  };
  return (
    <DemoContext.Provider
      value={{
        isDemo,
        isMouseEntered,
        setIsDemo,
        setIsMouseEntered,
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
