import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commentaires'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('contenu').notNullable()
      table.timestamp('date_commentaire').defaultTo(this.now())
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_tweet').unsigned().references('id').inTable('tweets').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
