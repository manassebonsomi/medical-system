/* import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {

    // Insertion des Utilisateurs
    await db.table('users').multiInsert([
      { full_name: 'Manassé Production', pseudo: 'bmmprod', email: 'manassebonsomi@mail.com', password: 'hash123', created_at: new Date(), updated_at: new Date() },
      { full_name: 'Kent Ngala', pseudo: 'kent', email: 'kentngala@mail.com', password: 'hash456', created_at: new Date(), updated_at: new Date() },
      { full_name: 'Sacré Mbiku', pseudo: 'sacre', email: 'sacre@kadea.co', password: 'hash789', created_at: new Date(), updated_at: new Date() },
      { full_name: 'Bmm Prod', pseudo: 'prod', email: 'bmmprod@mail.com', password: 'hash321', created_at: new Date(), updated_at: new Date() },
    ])

    // Insertion des Tweets
    await db.table('tweets').multiInsert([
      { contenu: 'Bonjour Twitter', id_user: 1 },
      { contenu: 'PostgreSQL est vraiment bon', id_user: 2 },
      { contenu: 'Je travaille sur un projet X', id_user: 3 },
      { contenu: 'Apprendre SQL change tout', id_user: 4 },
    ])

    // Insertion des Likes
    await db.table('likes').multiInsert([
      { id_user: 2, id_tweet: 1 },
      { id_user: 3, id_tweet: 1 },
      { id_user: 4, id_tweet: 2 },
      { id_user: 1, id_tweet: 3 },
    ])

    // Insertion des Follows
    await db.table('follows').multiInsert([
      { id_follower: 1, id_following: 2 },
      { id_follower: 2, id_following: 1 },
      { id_follower: 2, id_following: 3 },
      { id_follower: 3, id_following: 4 },
      { id_follower: 4, id_following: 1 }
    ])

    // Insertion des Commentaires
    await db.table('commentaires').multiInsert([
      { contenu: 'Très bon post !', id_user: 2, id_tweet: 1 },
      { contenu: 'Je suis totalement d’accord', id_user: 3, id_tweet: 2 },
      { contenu: 'Excellent sujet', id_user: 4, id_tweet: 3 },
    ])

    // Insertion des Retweets
    await db.table('retweets').multiInsert([
      { id_user: 2, id_tweet: 1 },
      { id_user: 4, id_tweet: 2 },
    ])

  }
}

 */
