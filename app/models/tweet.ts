import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Like from '#models/like'
import Retweet from '#models/retweet'
import Media from '#models/media'
import Commentaire from '#models/commentaire'
import Hashtag from '#models/hashtag'

export default class Tweet extends BaseModel {
  // public static table = 'tweets'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare contenu: string

  @column.dateTime({ autoCreate: true, columnName: 'date_publication' })
  declare datePublication: DateTime

  @column({ columnName: 'id_user' })
  declare idUser: number

  @belongsTo(() => User, {
    foreignKey: 'idUser'
  })
  declare user: BelongsTo<typeof User>

  // Les Médias attachés au tweet
  @hasMany(() => Media, { foreignKey: 'idTweet' })
  declare medias: HasMany<typeof Media>

  // Les Commentaires sous ce tweet
  @hasMany(() => Commentaire, { foreignKey: 'idTweet' })
  declare commentaires: HasMany<typeof Commentaire>

  // Les entrées de Likes (utile pour compter ou vérifier la date d'un like)
  @hasMany(() => Like, { foreignKey: 'idTweet' })
  declare likes: HasMany<typeof Like>

  // Les Utilisateurs qui ont liké (Relation Many-to-Many directe)
  @manyToMany(() => User, {
    pivotTable: 'likes',
    pivotForeignKey: 'id_tweet',
    pivotRelatedForeignKey: 'id_user',
  })
  declare utilisateursLikes: ManyToMany<typeof User>

  // Les entrées de Retweets
  @hasMany(() => Retweet, { foreignKey: 'idTweet' })
  declare retweets: HasMany<typeof Retweet>

  // Les Utilisateurs qui ont retweeté
  @manyToMany(() => User, {
    pivotTable: 'retweets',
    pivotForeignKey: 'id_tweet',
    pivotRelatedForeignKey: 'id_user',
    pivotColumns: ['date_retweet', 'contenu']
  })
  declare utilisateursRetweets: ManyToMany<typeof User>

  @manyToMany(() => Hashtag, {
    pivotTable: 'tweet_hashtags',
    pivotForeignKey: 'tweet_id',
    pivotRelatedForeignKey: 'hashtag_id',
  })
  declare hashtags: ManyToMany<typeof Hashtag>
}
