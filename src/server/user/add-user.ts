// src/server/trpc/router/user.ts
import { z } from "zod";
import prisma from "../prisma-client";
import { TRPCError } from "@trpc/server";

export const userRouter = createRouter().mutation("addUser", {
  input: z.object({
    firstname: z.string().nonempty("First name is required."),
    lastname: z.string().nonempty("Last name is required."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .nonempty("Password is required."),
  }),
  resolve: async ({ input }) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          hashedPassword: input.password, // Make sure you hash the password before saving
        },
      });
      return newUser;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while adding the user.",
      });
    }
  },
});
