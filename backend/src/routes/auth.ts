import { FastifyInstance } from "fastify";
import { loginHandler, getMeHandler } from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login", {
    schema: {
      tags: ["Auth"],
      summary: "Login a user",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
    },
  }, loginHandler);

  fastify.get("/me", {
    onRequest: [fastify.authenticate],
    schema: {
      tags: ["Auth"],
      summary: "Get current user profile",
      security: [{ apiKey: [] }],
    },
  }, getMeHandler);
}
