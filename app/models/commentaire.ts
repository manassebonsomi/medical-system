import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Tweet from '#models/tweet'

export default class Commentaire extends BaseModel {
 // public static table = 'commentaires'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare contenu: string

  @column.dateTime({ autoCreate: true, columnName: 'date_commentaire' })
  declare dateCommentaire: DateTime

  @column({ columnName: 'id_user' })
  declare idUser: number

  @column({ columnName: 'id_tweet' })
  declare idTweet: number

  // --- RELATIONS ---
  @belongsTo(() => User, { foreignKey: 'idUser' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Tweet, { foreignKey: 'idTweet' })
  declare tweet: BelongsTo<typeof Tweet>
}
