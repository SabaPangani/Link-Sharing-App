import Image from "next/image";
import { useSession } from "next-auth/react";

export default function PhoneDetails() {
  const { data: session } = useSession();

  return (
    <div className="absolute text-center top-[288px]">
      <header>
        {session?.user.image !== "false" && (
          <Image
            className="absolute -top-28 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-purple"
            src={session?.user.image!}
            alt="pfp"
            width={30}
            height={30}
          />
        )}
        <h1 className="text-dark text-lg font-semibold bg-white mb-2">
        {session?.user.name} {" "} {session?.user.lastName}
        </h1>
        <p className="text-gray text-sm bg-white px-10">{session?.user.email}</p>
      </header>
    </div>
  );
}
