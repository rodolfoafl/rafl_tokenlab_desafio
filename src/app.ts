import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { authenticationRoutes } from './routes/authentication'
import { eventsRoutes } from './routes/events'

export const app = fastify()

app.register(cookie)
app.register(authenticationRoutes)
app.register(eventsRoutes, {
  prefix: '/events',
})
