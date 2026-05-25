import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string; email: string; role: string };
    user: { id: string; email: string; role: string };
  }
}

import dbPlugin from "./plugins/db";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import classesRoutes from "./routes/classes";

dotenv.config();

const server = Fastify({
  logger: true,
});

// Register Plugins
server.register(cors, {
  origin: true, // reflects the requested origin
  credentials: true,
});

server.register(jwt, {
  secret: process.env.JWT_SECRET || "super-secret-key",
});

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Swagger Documentation
server.register(swagger, {
  swagger: {
    info: {
      title: "EduSync API",
      description: "EduSync School Management System API",
      version: "1.0.0",
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
});

server.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

// Register Database
server.register(dbPlugin);

// Register Routes
server.register(authRoutes, { prefix: "/api/auth" });
server.register(usersRoutes, { prefix: "/api/users" });
server.register(classesRoutes, { prefix: "/api/classes" });

// Health Check
server.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3001", 10);
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`API Documentation available at http://localhost:${port}/docs`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
