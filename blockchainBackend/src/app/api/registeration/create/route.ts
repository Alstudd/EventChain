import { Register } from "@/models/Register";

import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { walletAddress, eventID } = body;
    const newRegister = new Register({
      walletAddress,
      eventID,
    });
    await newRegister.save();
    return NextResponse.json({
      message: "Registeration created successfully",
      newRegister,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
