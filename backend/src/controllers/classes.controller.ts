import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../plugins/db";

const createClassSchema = z.object({
  name: z.string(),
  grade: z.string(),
  section: z.string(),
  subject: z.string().optional(),
  teacher_id: z.string().uuid().optional(),
  department_id: z.string().uuid().optional(),
  room_number: z.string().optional(),
  capacity: z.number().int().optional(),
  schedule: z.any().optional(),
});

export const getClassesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: {
          select: { name: true, email: true },
        },
        _count: {
          select: { students: true },
        },
      },
      orderBy: { created_at: "desc" },
    });
    return classes;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const getClassHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const cls = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { name: true, email: true },
        },
        students: true,
      },
    });

    if (!cls) {
      return reply.code(404).send({ message: "Class not found" });
    }

    return cls;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const createClassHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = createClassSchema.parse(request.body);

    const cls = await prisma.class.create({
      data,
    });

    return reply.code(201).send(cls);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ message: "Validation error", errors: error.issues });
    }
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
