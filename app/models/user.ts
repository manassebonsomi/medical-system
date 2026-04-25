import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Tweet from '#models/tweet'
import Like from '#models/like'
import Commentaire from '#models/commentaire'
import Retweet from '#models/retweet'
import Message from '#models/message'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import FollowRequest from '#models/follow_request'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  // public static table = 'users'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'full_name' })
  declare name: string

  @column()
  declare pseudo: string

  @column()
  declare email: string

  @column()
  declare phone: string | null

  @column()
  declare bio: string | null

  @column()
  declare address: string | null

  @column({ columnName: 'avatar_url' })
  declare avatarUrl: string | null

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare is_verified: boolean

  @column()
  declare token_verification: string | null

  @column.dateTime({ columnName: 'token_verification_expires_at' })
  declare tokenVerificationExpiresAt: DateTime | null

  @column()
  declare twoFactorCode: string | null

  @column.dateTime()
  declare twoFactorExpiresAt: DateTime | null

  @column()
  declare isPrivate: boolean

  @column()
  declare googleId: string


  /*
  @column.dateTime({ autoCreate: true, columnName: 'date_creation' })
  declare dateCreation: DateTime */

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Tweet, { foreignKey: 'idUser' })
  declare tweets: HasMany<typeof Tweet>

  @hasMany(() => Like, { foreignKey: 'idUser' })
  declare likes: HasMany<typeof Like>

  @hasMany(() => Commentaire, { foreignKey: 'idUser' })
  declare commentaires: HasMany<typeof Commentaire>

  @hasMany(() => Retweet, { foreignKey: 'idUser' })
  declare retweets: HasMany<typeof Retweet>

  // Les Messages Privés envoyés par l'utilisateur
  @hasMany(() => Message, { foreignKey: 'idExpediteur' })
  declare messagesEnvoyes: HasMany<typeof Message>

  // Les Messages Privés  reçus par l'utilisateur
  @hasMany(() => Message, { foreignKey: 'idDestinataire' })
  declare messagesRecus: HasMany<typeof Message>

  // Les Abonnements (Les comptes que cet utilisateur suit)
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'id_follower',
    pivotRelatedForeignKey: 'id_following',
  })
  declare abonnements: ManyToMany<typeof User>

  // Les Abonnés (Les comptes qui suivent cet utilisateur)
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'id_following',
    pivotRelatedForeignKey: 'id_follower',
  })
  declare abonnes: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'blocks',
    pivotForeignKey: 'id_blocker',
    pivotRelatedForeignKey: 'id_blocked',
  })
  declare blockedUsers: ManyToMany<typeof User>

  @hasMany(() => FollowRequest, {
    foreignKey: 'followingId',
  })
  declare receivedFollowRequests: HasMany<typeof FollowRequest>

  @hasMany(() => FollowRequest, {
    foreignKey: 'followerId',
  })
  declare sentFollowRequests: HasMany<typeof FollowRequest>
}
