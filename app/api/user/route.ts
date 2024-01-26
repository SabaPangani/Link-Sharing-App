import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/utils/authOptions";

export async function PUT(req: Request) {
  try {
    const { uId, fName, lName, email, image } = await req.json();
    const result = await prisma.user.update({
      where: { id: uId },
      data: { name: fName, lastName: lName, email, image },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const result = await prisma.user.findUnique({
      where: { id: session?.user?.id! },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}
