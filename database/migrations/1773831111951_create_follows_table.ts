import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'follows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_follower').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_following').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('date_follow').defaultTo(this.now())
      table.primary(['id_follower', 'id_following'])
      table.check('id_follower <> id_following')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
