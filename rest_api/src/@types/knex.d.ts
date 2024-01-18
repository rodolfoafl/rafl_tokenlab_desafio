// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
    }
    events: {
      id: string
      description: string
      startDate: string
      endDate: string
      userId: string
    }
  }
}
