import { cookies } from "next/headers";

export async function getUserIdFromCookies() {
  const cookie = await cookies();
  const userId = cookie.get("edmod_user_id")?.value;
  return userId ?? null;
}

export async function getUserIdFromCookiesOrThrow() {
  const userId = await getUserIdFromCookies();
  if (!userId) throw new Error("Unable to retrieve user id.\n\tTry signing in");
  return userId;
}

export async function setUserIdToCookies(userId: string) {
  const cookie = await cookies();
  cookie.set({
    maxAge: 30 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    name: "edmod_user_id",
    value: userId,
    httpOnly: true,
  });
}
