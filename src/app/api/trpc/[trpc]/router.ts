import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@app/server/context";
import { appRouter } from "@/server/router/app-router";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
export { handler as GET, handler as POST };