import bcrypt from 'bcrypt';
import { createCookieSessionStorage, redirect } from 'remix';
import { db } from './db.server';

type LoginType = {
  username: string;
  password: string;
}

export async function login({ username, password }: LoginType) {
  const existingUser = await db.user.findFirst({ where: { username } });
  if (!existingUser) return null;

  const passwordsMatch = await bcrypt.compare(password, existingUser.passwordHash);
  if (!passwordsMatch) return null;

  return existingUser;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET must be set");

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true` but that doesn't work on localhost for Safari: https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    }
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (typeof userId !== 'string') return null;
  return userId;
}