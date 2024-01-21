import fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { authenticationRoutes } from './routes/authentication'
import { eventsRoutes } from './routes/events'

export const app = fastify()

app.register(cors, {
  origin: ['http://localhost:5173'],
  credentials: true,
})
app.register(cookie)
app.register(authenticationRoutes)
app.register(eventsRoutes, {
  prefix: '/events',
})
