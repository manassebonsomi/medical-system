import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Tweet from '#models/tweet' // Assure-toi d'avoir ce modèle

export default class SearchesController {

  // Liste de toutes les conversations
  async show({ view }: HttpContext) {
    return view.render('pages/search')
  }

  async index({ request, view }: HttpContext) {
    const query = request.input('q')

    let userResults: User[] = []
    let tweetResults: Tweet[] = []

    if (query && query.length > 0) {
      // Recherche des utilisateurs
      userResults = await User.query()
        .where((builder) => {
          builder
            .where('full_name', 'like', `%${query}%`)
            .orWhere('pseudo', 'like', `%${query}%`)
        })
        .limit(5)

      // Recherche des tweets
      tweetResults = await Tweet.query()
        .where('contenu', 'like', `%${query}%`)
        .preload('user')
        .preload('medias')
        .withCount('commentaires')
        .withCount('likes')
        .withCount('retweets')
        .orderBy('date_publication', 'desc')
        .limit(20)
    }

    return view.render('pages/search_results', {
      userResults,
      tweetResults,
      query
    })
  }
}
