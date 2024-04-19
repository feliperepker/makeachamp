import Fastify from "fastify";
import cors from "@fastify/cors";
import { champRoutes } from "./routes/champ";
import { teamRoutes } from "./routes/team";
import jwt from "@fastify/jwt";
import { stepRoutes } from "./routes/step";
import { authRoutes } from "./routes/auth";
require("dotenv").config();

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });
  await fastify.register(cors, {
    origin: true,
  });
  await fastify.register(jwt, {
    secret: process.env.SECRET as string,
  });

  await fastify.register(teamRoutes);
  await fastify.register(champRoutes);
  await fastify.register(stepRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({ port: 3333 });
}

bootstrap();
