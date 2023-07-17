import { NextResponse } from "next/server";
import { ThreadsAPI } from "threads-api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");
  const threadsAPI = new ThreadsAPI({
    username: username,
    password: password,
  });
  const userID = await threadsAPI.getUserIDfromUsername(username);
  let { users: followers, next_max_id: cursor1 } =
    await threadsAPI.getUserFollowers(userID);
  followers = followers.map((el) => {
    return el["username"];
  });

  let { users: following, next_max_id: cursor2 } =
    await threadsAPI.getUserFollowings(userID);
  following = following.map((el) => {
    return el["username"];
  });

  return NextResponse.json({ followers: followers, following: following });
}
