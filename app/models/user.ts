import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Message from '#models/message'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'

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

  // Les Messages Privés envoyés par l'utilisateur
  @hasMany(() => Message, { foreignKey: 'idExpediteur' })
  declare messagesEnvoyes: HasMany<typeof Message>

  // Les Messages Privés  reçus par l'utilisateur
  @hasMany(() => Message, { foreignKey: 'idDestinataire' })
  declare messagesRecus: HasMany<typeof Message>
  
}
