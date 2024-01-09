import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let result = null;
  console.log("LINKS");

  try {
    const data = await req.json();
    console.log(data);
    result = await prisma.link.createMany({
      data,
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}
 