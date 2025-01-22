// TODO USER DATA ACCESS

import db from "@/lib/db";

export function addUser(data: NewUser) {
  return db.insertInto("users").values(data).execute();
}

export function fetchUser(userId: string) {
  return db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirst();
}

export function fetchUserOrThrow(userId: string) {
  return db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirstOrThrow();
}
