import prisma from "@/server/prisma-client";
import { User, UserClerkId } from "@/utils/types";

export async function getUserByClerkId(
  user_clerk_id: UserClerkId
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      user_clerk_id: user_clerk_id,
    },
  });
  return user;
}
