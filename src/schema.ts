import { PrismaClient } from "@prisma/client";
import { builder } from "./context";

const prisma = new PrismaClient({});

builder.prismaObject("User", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id")!,
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    password: t.exposeString("password"),
    // createdAt: t.expose('createdAt', {
    //   type: 'DateTime' as any,
    // })
  }),
});

builder.queryType({
  fields: (t) => ({
    me: t.prismaField({
      type: "User",
      resolve: async (query, root, args, ctx: any, info) => {
        // Implement a function to get the user ID from context
        const user = await prisma.user.findUnique({ where: { id: 1 } });
        return user!;
      },
    }),

    userList: t.prismaField({
      type: ["User"],
      resolve: async (query, root, args, ctx: any, info) => {
        // Implement a function to get the user ID from context
        const user = await prisma.user.findMany({ ...query });
        return user as any;
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    addUser: t.prismaField({
      type: "User",
      args: {
        name: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx: any, info) => {
        const newUser = await prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: args.password,
          },
        });

        return newUser;
      },
    }),

    deleteUser: t.prismaField({
      type: "User",
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (query, root, args, ctx: any, info) => {
        const deletedUser = await prisma.user.delete({
          where: { id: args.id },
        });

        return deletedUser;
      },
    }),

    updateUser: t.prismaField({
      type: "User",
      args: {
        id: t.arg.int({ required: true }),
        name: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx: any, info) => {
        const updatedUser = await prisma.user.update({
          where: { id: args.id },
          data: {
            name: args.name,
          },
        });

        return updatedUser;
      },
    }),
  }),
});

export const schema = builder.toSchema();
