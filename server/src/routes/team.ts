import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function teamRoutes(fastify: FastifyInstance) {
  fastify.post("/team", async (request, reply) => {
    const createTeam = z.object({
      name: z.string(),
    });

    const { name } = createTeam.parse(request.body);
    await prisma.team.create({
      data: {
        name,
        ownerId: request.user.sub,
      },
    });
    return reply.status(201).send();
  });

  fastify.put("/adduserinteam", async (request, reply) => {
    try {
      const editTeam = z.object({
        team: z.string(),
      });

      const { team } = editTeam.parse(request.body);
      await prisma.team.update({
        where: {
          id: team,
        },
        data: {
          participants: {
            connect: {
              id: request.user.sub,
            },
          },
        },
      });

      return reply.status(201).send();
    } catch (ex) {
      return reply.status(400).send({ ex });
    }
  });

  fastify.put("/team", async (request, reply) => {
    try {
      const editTeam = z.object({
        id: z.string(),
        name: z.string(),
      });

      const { name, id } = editTeam.parse(request.body);
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
