// database/migrations/xxxx_create_blocks_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_blocker').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_blocked').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')

      // Un utilisateur ne peut pas bloquer deux fois la même personne
      table.unique(['id_blocker', 'id_blocked'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
