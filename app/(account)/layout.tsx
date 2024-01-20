import { Metadata } from "next";
import NavBar from "./NavBar";
import { LinkProvider } from "../store/linksContext";
export const metadata: Metadata = {
  title: "Account",
  description: "Customize links",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <main className="px-3">{children}</main>
    </div>
  );
}
