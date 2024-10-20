import Event from "@/models/Event";
import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import NextCors from "nextjs-cors";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { title, description, date, image } = body;
    // if (authToken !== process.env.AUTH_TOKEN) {
    //   return NextResponse.json({
    //     message: "Invalid Auth Token",
    //   });
    // }

    // sample request body
    // {
    //   "title": "iPhone 13",
    //   "basePrice": 1000,
    //   "startTime": "2022-01-01T00:00:00.000Z",
    //   "endTime": "2022-01-02T00:00:00.000Z",
    //   "imgUrl": "https://example.com/image.jpg",
    //   "highestBid": 1001,
    //   "authToken": "your_auth_token"
    // }
    const newAuction = new Event({
      title,
      description,
      date,
      image,
    });
    await newAuction.save();

    return NextResponse.json({
      message: "Event created successfully",
      newAuction,
      link: `http://localhost:3000/api/actions/event?eventID=${newAuction._id}`,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
