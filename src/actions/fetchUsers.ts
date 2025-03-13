"use server";
import db from "@/lib/prisma";

export async function fetchUsers() {
  const users = await db.user.findMany();

  return users;
}
