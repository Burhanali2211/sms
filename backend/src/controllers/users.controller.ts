import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../plugins/db";
import bcrypt from "bcryptjs";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  name: z.string(),
  role: z.string(),
  status: z.string().optional(),
  phone: z.string().optional(),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  phone: z.string().optional(),
});

export const getUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        phone: true,
        last_login: true,
        created_at: true,
      },
      orderBy: { created_at: "desc" },
    });
    return users;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const getUserHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        phone: true,
        last_login: true,
        created_at: true,
      },
    });

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    return user;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const createUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = createUserSchema.parse(request.body);
    const passwordHash = data.password ? await bcrypt.hash(data.password, 10) : await bcrypt.hash("admin", 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password_hash: passwordHash,
        name: data.name,
        role: data.role,
        status: data.status || "active",
        phone: data.phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      },
    });

    return reply.code(201).send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ message: "Validation error", errors: error.issues });
    }
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const updateUserHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const data = updateUserSchema.parse(request.body);

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        phone: true,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ message: "Validation error", errors: error.issues });
    }
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const deleteUserHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    await prisma.user.delete({
      where: { id },
    });

    return reply.code(204).send();
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
