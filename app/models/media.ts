import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tweet from '#models/tweet'

export default class Media extends BaseModel {
  // public static table = 'media'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'type_media' })
  declare typeMedia: string

  @column({ columnName: 'url_media' })
  declare urlMedia: string

  @column({ columnName: 'id_tweet' })
  declare idTweet: number

  // --- RELATIONS
  @belongsTo(() => Tweet)
  declare tweet: BelongsTo<typeof Tweet>
}
