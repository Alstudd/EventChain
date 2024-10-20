import Event from "@/models/Event";
import { connectToDB } from "@/utils/connectToDB";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();
    // eventID = "67148d3de73c22f05b53d41e";
    const LatestAuction = await Event.find();
    console.log(LatestAuction);

    return NextResponse.json(
      {
        LatestAuction,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
