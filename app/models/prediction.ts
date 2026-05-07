import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class Prediction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare filename: string

  @column()
  declare label: string

  @column()
  declare accuracy: number

  @column()
  declare modelUsed: string

  /* @column()
  declare userId: number */

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation vers le créateur (Médecin)
  /* @belongsTo(() => User, { foreignKey: 'userId' })
  declare creator: BelongsTo<typeof User> */
}