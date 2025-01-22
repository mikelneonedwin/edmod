"use server";

import { addUser, fetchUser } from "@/data/user";
import { rollbarServer } from "@/lib/rollbar";
import { getErrorMessage, validateInput } from "@/lib/utils";
import { setUserIdToCookies } from "@/utils/server/cookies";
import { redirect } from "next/navigation";
import type { LogArgument } from "rollbar";
import { z } from "zod";

export async function signIn(data: NewUser) {
  try {
    const schema: z.ZodType<NewUser> = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      img: z.string().url().nullable().optional(),
      user_id: z.string().base64(),
    });
    const user = await validateInput(schema, data);
    const userExists = await fetchUser(user.user_id);
    if (!userExists) await addUser(user);
    await setUserIdToCookies(user.user_id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    rollbarServer.error(error as LogArgument);
    return getErrorMessage(error);
  }
  redirect("/get-started");
}
