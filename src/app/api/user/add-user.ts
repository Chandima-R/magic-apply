import prisma from "@/server/prisma-client";
import bcrypt from "bcrypt";
import { AddUser, User } from "@/utils/types";

export async function addUser(
  addUserMeta: AddUser
): Promise<Omit<User, "hashedPassword">> {
  try {
    const hashedPassword = await bcrypt.hash(addUserMeta.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...addUserMeta,
        hashedPassword,
      },
    });

    const { hashedPassword: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Failed to add user: ${error.message}`);
  }
}
