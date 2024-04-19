import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function stepRoutes(fastify: FastifyInstance) {
  fastify.post("/step", async (request, reply) => {
    const stepChamp = z.object({
      name: z.string(),
      champ: z.string(),
    });

    const { name, champ } = stepChamp.parse(request.body);
    await prisma.step.create({
      data: {
        name: name,
        champId: champ,
      },
    });
    return reply.status(201).send();
  });
}
