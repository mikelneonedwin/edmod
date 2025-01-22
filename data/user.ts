// TODO USER DATA ACCESS

import db from "@/lib/db";

export function addUser(data: NewUser) {
  return db.insertInto("users").values(data).execute();
}