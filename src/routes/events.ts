import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function eventsRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const createEventBodySchema = z.object({
      description: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      userId: z.string(),
    })

    const { description, startDate, endDate, userId } =
      createEventBodySchema.parse(req.body)
    console.log(description, startDate, endDate, userId)
    // TODO: create event

    return reply.status(201).send()
  })

  app.put('/:id', async (req, reply) => {
    const getEventParamsSchema = z.object({
      // id: z.string().uuid(),
      id: z.string(),
    })

    const { id } = getEventParamsSchema.parse(req.params)
    console.log(id, req.body)
    // TODO: update event

    return reply.status(201).send()
  })

  app.delete('/:id', async (req, reply) => {
    const getEventParamsSchema = z.object({
      // id: z.string().uuid(),
      id: z.string(),
    })

    const { id } = getEventParamsSchema.parse(req.params)
    console.log(id, req.body)
    // TODO: remove event

    return reply.status(201).send()
  })

  app.get('/', async () => {
    const events: never[] = []
    console.log(events)
    // TODO: list events

    return {
      events,
    }
  })
}
