import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function champRoutes(fastify: FastifyInstance) {
  fastify.post("/champ", async (request, reply) => {
    const createChamp = z.object({
      name: z.string(),
    });

    const { name } = createChamp.parse(request.body);
    await prisma.champ.create({
      data: {
        name,
        ownerId: "Felipe",
      },
    });
    return reply.status(201).send();
  });

  fastify.put("/addteaminchamp", async (request, reply) => {
    try {
      const editChamp = z.object({
        champ: z.string(),
        team: z.string(),
      });

      const { champ, team } = editChamp.parse(request.body);
      await prisma.champ.update({
        where: {
          id: champ,
        },
        data: {
          teams: {
            connect: {
              id: team,
            },
          },
        },
      });

      return reply.status(201).send();
    } catch (ex) {
      return reply.status(400).send({ ex });
    }
  });

  fastify.put("/champ", async (request, reply) => {
    try {
      const editChamp = z.object({
        id: z.string(),
        name: z.string(),
      });

      const { name, id } = editChamp.parse(request.body);
      await prisma.team.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });

      return reply.status(201).send();
    } catch (ex) {
      return reply.status(400).send({ ex });
    }
  });
}
