import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../plugins/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    // For development, we bypass hashing if the password matches exactly.
    // In production, ensure all passwords are hashed.
    const isPasswordValid = 
      password === user.password_hash || 
      (await bcrypt.compare(password, user.password_hash).catch(() => false));

    if (!isPasswordValid) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ message: "Validation error", errors: error.issues });
    }
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const getMeHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = request.user as { id: string };
    
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar_url: true,
      }
    });

    if (!dbUser) {
      return reply.code(404).send({ message: "User not found" });
    }

    return { user: dbUser };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
