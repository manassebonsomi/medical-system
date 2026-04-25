import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Tweet from '#models/tweet'

export default class Retweet extends BaseModel {
  // public static table = 'retweets'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'id_user' })
  declare idUser: number

  @column({ columnName: 'id_tweet' })
  declare idTweet: number

  @column()
  declare contenu: string

  @column.dateTime({ autoCreate: true, columnName: 'date_retweet' })
  declare dateRetweet: DateTime

  @computed()
  public get formattedDate() {
    return this.dateRetweet
      .setLocale('fr')
      .toFormat("d MMMM yyyy 'à' HH'h'mm")
      }

  // --- RELATIONS ---
  @belongsTo(() => User, { foreignKey: 'idUser' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Tweet, { foreignKey: 'idTweet' })
  declare tweet: BelongsTo<typeof Tweet>
}
