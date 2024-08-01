import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const trpc = initTRPC.context<Context>().create();

export const { router } = trpc;

export const { middleware } = trpc;

export const publicProcedure = trpc.procedure;

export const isAuthed = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.session?.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.session.user,
    },
  });
});
export const protectedProcedure = trpc.procedure.use(isAuthed);
