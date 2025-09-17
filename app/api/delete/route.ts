import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });

  return NextResponse.json({ success: true });
}
