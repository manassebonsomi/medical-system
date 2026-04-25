import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const password = await hash.make('password123')
    const now = DateTime.now().toSQL()

    await db.table('users').multiInsert([
      { full_name: 'Kent Ngala', pseudo: 'kent', email: 'kentngala@mail.com', password: password, created_at: now, updated_at: now },
      { full_name: 'Sacré Mbiku', pseudo: 'sacre', email: 'sacre@kadea.co', password: password, created_at: now, updated_at: now },
      { full_name: 'Bmm Prod', pseudo: 'prod', email: 'bmmprod@mail.com', password: password, created_at: now, updated_at: now },
    ])

    // Insertion des Tweets
    await db.table('tweets').multiInsert([
      { contenu: 'Bonjour NovaTech ! ', id_user: 1 },
      { contenu: 'PostgreSQL est vraiment puissant pour le scale.', id_user: 2 },
      { contenu: 'Je travaille sur la nouvelle interface de login.', id_user: 3 },
      { contenu: 'Apprendre le SQL, c’est comme apprendre à parler à sa base de données.', id_user: 4 },
    ])

    // Insertion des Likes
    await db.table('likes').multiInsert([
      { id_user: 2, id_tweet: 1 },
      { id_user: 3, id_tweet: 1 },
      { id_user: 4, id_tweet: 2 },
      { id_user: 1, id_tweet: 3 },
    ])

    // Insertion des Commentaires
    await db.table('commentaires').multiInsert([
      { contenu: 'Très bon post !', id_user: 2, id_tweet: 1 },
      { contenu: 'Je suis totalement d’accord avec toi.', id_user: 3, id_tweet: 2 },
      { contenu: 'C’est un excellent sujet de discussion.', id_user: 4, id_tweet: 3 },
    ])

    // Insertion des Retweets
    await db.table('retweets').multiInsert([
      { id_user: 2, id_tweet: 1 },
      { id_user: 4, id_tweet: 2 },
    ])
  }
}
