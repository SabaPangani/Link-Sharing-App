"use client";

import * as React from "react";
import { LinkContextType, ILink } from "../shared/types/Link";
import { useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";

export const LinkContext = React.createContext<LinkContextType | null>(null);

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = React.useState<ILink[]>([]);
  const { data: session } = useSession();

  const addLinks = () => {
    if (links.length < 5) {
      const newLink = {
        id: uuid(),
        platform: "GitHub",
        url: "",
        order: links.length + 1,
        userId: session?.user?.email,
      } as ILink;
      setLinks((prev) => [...prev, newLink]);
    }
  };
  const getLinks = async () => {
    const res = await fetch("/api/links");
  };
  const updateLink = (id: string, platform: string) => {
    links.find((link) => link.id === id)!.platform = platform;
  };
  const removeLink = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    let l = links.length;
    for (let i = 1; i < l; i++) {
      links[i].order = i;
    }
  };
  return (
    <LinkContext.Provider
      value={{ links, addLinks, getLinks, updateLink, removeLink }}
    >
      {children}
    </LinkContext.Provider>
  );
};
