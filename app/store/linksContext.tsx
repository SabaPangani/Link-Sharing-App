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
  const [isLoading, setIsLoading] = React.useState(true);
  const { data: session } = useSession();

  React.useEffect(() => {
    if (!session) {
      localStorage.removeItem("Links");
    }
    if (localStorage.getItem("Links") === null) {
      getLinks();
    } else {
      setIsLoading(false);
      setLinks(JSON.parse(localStorage.getItem("Links")!));
    }
  }, []);
  const addLinks = () => {
    if (links.length < 5) {
      const newLink = {
        id: uuid().toString(),
        platform: "GitHub",
        url: "",
        userId: session?.user?.email,
        order: links.length + 1,
      } as ILink;
      setLinks((prev) => [...prev, newLink]);
    }
  };
  const getLinks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/links");

      if (!res.ok) {
        throw new Error(`Failed to fetch links ${res.status}`);
      }

      const json = await res.json();
      console.log(json.result);
      localStorage.setItem("Links", JSON.stringify(json.result));
      setLinks(json.result);
    } catch (err: any) {
      console.error("Error fetching links:", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const updateLink = async (id: string, platform: string) => {
    links.find((link) => link.id === id)!.platform = platform;
  };
  const removeLink = async (id: string) => {
    try {
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      let l = links.length;
      for (let i = 1; i < l; i++) {
        links[i].order = i;
      }

      const res = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error(`Failed to delete link ${res.status}`);
      }
    } catch (err: any) {
      console.error("Error deleting link:", err.message);
    }
  };
  return (
    <LinkContext.Provider
      value={{ links, addLinks, getLinks, updateLink, removeLink, isLoading }}
    >
      {children}
    </LinkContext.Provider>
  );
};
