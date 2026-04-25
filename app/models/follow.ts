import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Follow extends BaseModel {
  public static table = 'follows'

  @column({ columnName: 'id_follower' })
  declare idFollower: number

  @column({ columnName: 'id_following' })
  declare idFollowing: number

  @column.dateTime({ autoCreate: true, columnName: 'date_follow' })
  declare dateFollow: DateTime

  // --- RELATIONS ---
  @belongsTo(() => User, { foreignKey: 'idFollower' })
  declare follower: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'idFollowing' })
  declare following: BelongsTo<typeof User>
}
