import { NextResponse } from "next/server";
import { ThreadsAPI } from "threads-api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const threadsAPI = new ThreadsAPI();
  const username = searchParams.get("username");
  const userID = await threadsAPI.getUserIDfromUsername(username);
  if (!userID) {
    return NextResponse.json({});
  }
  const user = await threadsAPI.getUserProfile(username, userID);

  return NextResponse.json({ user });
}
