import type { inferAsyncReturnType } from "@trpc/server";
import { getServerSession } from "next-auth";

export async function createContext() {
  const session = await getServerSession();
  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
