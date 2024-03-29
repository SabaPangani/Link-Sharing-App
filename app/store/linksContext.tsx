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
  const [isEdited, setIsEdited] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const { data: session } = useSession();

  React.useEffect(() => {
    if (!session) {
      localStorage.removeItem("links");
    } else {
      const storedLinks = localStorage.getItem("links");

      if (!storedLinks) {
        getLinks();
      } else {
        const parsedLinks = JSON.parse(storedLinks);
        setLinks(parsedLinks);
        setIsLoading(false);
      }
    }
  }, [session]);

  const addLinks = () => {
    if (links.length < 5) {
      const newLink = {
        id: uuid().toString(),
        platform: "GitHub",
        url: "",
        userId: session?.user?.id,
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

      const sortedLinks = json.result.sort(
        (a: ILink, b: ILink) => a.order - b.order
      );

      const updatedLinks = sortedLinks.map((link: ILink, index: number) => {
        return { ...link, order: index + 1 };
      });

      localStorage.setItem("links", JSON.stringify(updatedLinks));
      setLinks(updatedLinks);
    } catch (err: any) {
      console.error("Error fetching links:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLink = async (id: string, platform: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { ...link, platform } : link))
    );
    setIsEdited(true);
  };
  const removeLink = async (id: string) => {
    try {
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));

      setLinks((prevLinks) =>
        prevLinks.map((link, index) => ({ ...link, order: index + 1 }))
      );

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
      value={{
        links,
        addLinks,
        getLinks,
        updateLink,
        removeLink,
        setIsEdited,
        setShowModal,
        isLoading,
        isEdited,
        showModal,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
