import { TRPCError } from "@trpc/server";
import { z } from "zod"; // Ensure you have zod installed for schema validation
import { User } from "@/utils/types";
import { protectedProcedure } from "../trpc";
import prisma from "../prisma-client";

export const getUserById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }): Promise<User | null> => {
    const { id } = input;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while fetching the user.",
      });
    }
  });
