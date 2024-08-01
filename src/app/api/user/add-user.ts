import prisma from "@/utils/prisma-client";
import { User, AddUser } from "@/utils/types";

export async function addUser(addUserMeta: AddUser): Promise<User> {
  const newUser = await prisma.user.create({
    data: addUserMeta,
  });
  return newUser;
}
