import { Metadata } from "next";
import NavBar from "./NavBar";
import Links from "./profile-links/Links";

export const metadata: Metadata = {
  title: "Account",
  description: "Customize links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
