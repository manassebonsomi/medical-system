// app/models/hashtag.ts
import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Tweet from '#models/tweet'

export default class Hashtag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @manyToMany(() => Tweet, {
    pivotTable: 'tweet_hashtags',
    pivotForeignKey: 'hashtag_id',
    pivotRelatedForeignKey: 'tweet_id',
  })
  declare tweets: ManyToMany<typeof Tweet>
}
