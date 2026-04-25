import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'retweets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_tweet').unsigned().references('id').inTable('tweets').onDelete('CASCADE')
      table.text('contenu').notNullable()
      table.timestamp('date_retweet').defaultTo(this.now())
      table.unique(['id_user', 'id_tweet'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
