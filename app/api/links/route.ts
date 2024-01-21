import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/utils/authOptions";
export async function POST(req: Request) {
  try {
    const { links } = await req.json();
    console.log(links);
    const result = await prisma.link.createMany({
      data: links,
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { links } = await req.json();

    const updatedLinks = [];
    const newLinks = [];

    for (const link of links) {
      if (link.id) {
        const existingLink = await prisma.link.findUnique({
          where: { id: link.id },
        });

        if (existingLink) {
          const updatedLink = await prisma.link.update({
            where: { id: link.id },
            data: link,
          });
          updatedLinks.push(updatedLink);
        } else {
          const newLink = await prisma.link.create({
            data: link,
          });
          console.log(newLink);
          newLinks.push(newLink);
        }
      }
    }

    return NextResponse.json({ updatedLinks, newLinks }, { status: 200 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const result = await prisma.link.delete({ where: { id } });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const result = await prisma.link.findMany();

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}
