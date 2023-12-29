import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(data.password, salt);

    console.log(hashedPassword);

    const result = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return NextResponse.json({res: result});
  } catch (error) {
    return NextResponse.json({error: "Error hashing password or creating user:"});
  }
}
