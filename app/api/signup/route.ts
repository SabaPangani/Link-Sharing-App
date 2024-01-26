import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!validator.isEmail(data.email)) {
      throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(data.password)) {
      throw new Error("Weak password");
    }
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(data.password, salt);

    const result = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}
