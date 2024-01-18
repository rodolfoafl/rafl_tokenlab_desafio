import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('events', (table) => {
    table.uuid('id').primary()
    table.string('description').notNullable()
    table.string('startDate').notNullable()
    table.string('endDate').notNullable()
    table
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('events')
}
