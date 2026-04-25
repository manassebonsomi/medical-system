import { HttpContext } from '@adonisjs/core/http'
import GrokService from '#services/grok_service'
import Tweet from '#models/tweet'

export default class GroksController {
  private grokService = new GrokService()

  // Générer un tweet
  async generate({ request, response }: HttpContext) {
    const topic = request.input('topic')
    const generatedText = await this.grokService.generateTweet(topic)
    return response.json({ text: generatedText })
  }

  // Suggérer des hashtags
  async hashtags({ request, response }: HttpContext) {
    const content = request.input('content')
    const hashtags = await this.grokService.suggestHashtags(content)
    return response.json({ hashtags })
  }

  // Analyser le profil
  async analyze({ auth, response }: HttpContext) {
    const user = auth.user!

    const recentTweets = await Tweet.query()
      .where('id_user', user.id)
      .withCount('likes')
      .withCount('commentaires')
      .orderBy('date_publication', 'desc')
      .limit(5)

    if (recentTweets.length === 0) {
      return response.json({ analysis: "Publiez quelques tweets pour que je puisse analyser votre style !" })
    }

    const tweetsData = recentTweets.map(t => ({
      content: t.contenu,
      stats: `${t.$extras.likes_count} likes, ${t.$extras.commentaires_count} comms`,
      date: t.datePublication.toFormat('dd/MM')
    }))

    const analysis = await this.grokService.analyzeProfile(tweetsData)
    return response.json({ analysis })
  }
}
