import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('contenu').notNullable()
      table.timestamp('date_envoi').defaultTo(this.now())
      table.boolean('lu').defaultTo(false)
      table.integer('id_expediteur').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_destinataire').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.check('id_expediteur <> id_destinataire')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
