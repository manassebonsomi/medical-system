import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tweet from '#models/tweet'
import User from '#models/user'

export default class Like extends BaseModel {
  // public static table = 'likes'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'id_user' })
  declare idUser: number

  @column({ columnName: 'id_tweet' })
  declare idTweet: number

  @column.dateTime({ autoCreate: true, columnName: 'date_like' })
  declare dateLike: DateTime

  // --- RELATIONS ---
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Tweet)
  declare tweet: BelongsTo<typeof Tweet>
}
