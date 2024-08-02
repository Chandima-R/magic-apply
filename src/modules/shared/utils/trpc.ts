import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import { getAppDomain } from "./get-addp-domain";
import { AppRouter } from "@/server";

export const trpc = createTRPCReact<AppRouter>({});
export const trpcVanillaClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getAppDomain()}/api/trpc`,
    }),
  ],
});
