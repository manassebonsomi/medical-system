import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Message extends BaseModel {
  // public static table = 'messages'

  @column({ isPrimary: true})
  declare id: number

  @column()
  declare contenu: string

  @column.dateTime({ autoCreate: true, columnName: 'date_envoi' })
  declare dateEnvoi: DateTime

  @column()
  declare lu: boolean

  @column({ columnName: 'id_expediteur' })
  declare idExpediteur: number

  @column({ columnName: 'id_destinataire' })
  declare idDestinataire: number

  // --- RELATIONS
  @belongsTo(() => User, { foreignKey: 'idExpediteur' })
  declare expediteur: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'idDestinataire' })
  declare destinataire: BelongsTo<typeof User>
}
