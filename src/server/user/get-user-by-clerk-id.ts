import { TRPCError } from "@trpc/server";
import { User, UserClerkId } from "@/utils/types";
import { protectedProcedure } from "../trpc";
import prisma from "../prisma-client";

export const getUserByClerkId = protectedProcedure.query(
  async ({
    user_clerk_id,
  }: {
    user_clerk_id: UserClerkId;
  }): Promise<User | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          user_clerk_id,
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while fetching the user.",
      });
    }
  }
);
