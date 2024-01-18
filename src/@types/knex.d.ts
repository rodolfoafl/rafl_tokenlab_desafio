// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: number
      password: string
    }
    events: {
      id: string
      description: string
      starDate: string
      endDate: string
      userId: string
    }
  }
}
