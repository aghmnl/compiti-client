import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../compiti-server/src/trpc";

export const trpc = createTRPCReact<AppRouter>();
