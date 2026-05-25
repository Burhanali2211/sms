import { FastifyInstance } from "fastify";
import {
  getUsersHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/users.controller";

export default async function usersRoutes(fastify: FastifyInstance) {
  // All user routes require authentication
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get("/", {
    schema: {
      tags: ["Users"],
      summary: "Get all users",
      security: [{ apiKey: [] }],
    },
  }, getUsersHandler);

  fastify.get("/:id", {
    schema: {
      tags: ["Users"],
      summary: "Get user by ID",
      security: [{ apiKey: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
  }, getUserHandler);

  fastify.post("/", {
    schema: {
      tags: ["Users"],
      summary: "Create a new user",
      security: [{ apiKey: [] }],
      body: {
        type: "object",
        required: ["email", "name", "role"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          status: { type: "string" },
          phone: { type: "string" },
        },
      },
    },
  }, createUserHandler);

  fastify.put("/:id", {
    schema: {
      tags: ["Users"],
      summary: "Update user by ID",
      security: [{ apiKey: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      body: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          name: { type: "string" },
          role: { type: "string" },
          status: { type: "string" },
          phone: { type: "string" },
        },
      },
    },
  }, updateUserHandler);

  fastify.delete("/:id", {
    schema: {
      tags: ["Users"],
      summary: "Delete user by ID",
      security: [{ apiKey: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
  }, deleteUserHandler);
}
