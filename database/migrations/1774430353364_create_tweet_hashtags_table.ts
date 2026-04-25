// database/migrations/xxxx_hashtag_tweet.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tweet_hashtags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tweet_id').unsigned().references('id').inTable('tweets').onDelete('CASCADE')
      table.integer('hashtag_id').unsigned().references('id').inTable('hashtags').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
