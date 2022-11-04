import { FastifyInstance } from "fastify";
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import { prisma } from "../lib/prisma";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })
  
  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } = createPoolBody.parse(request.body)

    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase();

    let ownerId = null;

    try { 
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,
        }
      })      
    } catch {
      await prisma.pool.create({
        data: {
          title,
          code
        }
      })
    }

    return reply.status(201).send({ code }) 
  })  
}
