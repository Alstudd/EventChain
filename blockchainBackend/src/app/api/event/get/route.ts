import Event from "@/models/Event";
import { connectToDB } from "@/utils/connectToDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    console.log(body);
    const { eventID } = body; // If `body` is empty or malformed, this will throw an error
    // eventID = "67148d3de73c22f05b53d41e";
    const LatestAuction = await Event.findById(eventID);
    console.log(LatestAuction);
    const endTime = LatestAuction.date;
    let disableStatus;
    const now = new Date();
    if (now > endTime) {
      disableStatus = true;
    } else {
      disableStatus = false;
    }
    return NextResponse.json({
      LatestAuction,
      disableStatus,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
