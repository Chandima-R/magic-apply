import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { AddUser, User } from "@/utils/types";
import { protectedProcedure } from "../trpc";
import prisma from "../prisma-client";

export const addUser = protectedProcedure
  .input(
    z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      password: z.string(),
    })
  )
  .mutation(async ({ input }): Promise<User> => {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          hashedPassword: input.password, // Assuming the password is hashed before saving
        },
      });
      return newUser;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while adding the user.",
      });
    }
  });
