import { FastifyInstance } from "fastify";
import {
  getClassesHandler,
  getClassHandler,
  createClassHandler,
} from "../controllers/classes.controller";

export default async function classesRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get("/", {
    schema: {
      tags: ["Classes"],
      summary: "Get all classes",
      security: [{ apiKey: [] }],
    },
  }, getClassesHandler);

  fastify.get("/:id", {
    schema: {
      tags: ["Classes"],
      summary: "Get class by ID",
      security: [{ apiKey: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
  }, getClassHandler);

  fastify.post("/", {
    schema: {
      tags: ["Classes"],
      summary: "Create a new class",
      security: [{ apiKey: [] }],
      body: {
        type: "object",
        required: ["name", "grade", "section"],
        properties: {
          name: { type: "string" },
          grade: { type: "string" },
          section: { type: "string" },
          subject: { type: "string" },
          teacher_id: { type: "string" },
          department_id: { type: "string" },
          room_number: { type: "string" },
          capacity: { type: "number" },
        },
      },
    },
  }, createClassHandler);
}
