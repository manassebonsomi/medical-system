import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name', 100).notNullable()
      table.string('pseudo', 50).unique().nullable()
      table.string('email', 150).notNullable().unique()
      table.string('phone', 20).unique().nullable()
      table.string('bio', 200).nullable()
      table.string('address', 100).nullable()
      table.string('avatar_url').nullable()
      table.text('password').nullable()
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_private').defaultTo(false)
      table.string('token_verification').nullable()
      table.timestamp('token_verification_expires_at').nullable()
      table.string('two_factor_code').nullable()
      table.dateTime('two_factor_expires_at').nullable()
      table.string('google_id').nullable().unique()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
