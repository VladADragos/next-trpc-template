import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function queryShit() {

  prisma.$connect()

  //const allUsers = await prisma.user.findMany();
  const user = {
    data: {
      name: "user0",
      email: "email0",
      posts: { create: { title: "hello world" } },
      profile: {
        create: {
          bio: 'sucka'
        }
      }
    }
  }

  // await prisma.user.create(user);
  const users = await prisma.user.findFirst();
  console.log(user);
  //console.log(allUsers);

  prisma.$disconnect()
}

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string(),
      })
    ,
    resolve: ({ input }) => {
      queryShit();
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});