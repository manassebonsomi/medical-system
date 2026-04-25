import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'
import User from '#models/user'

export default class MessagesController {

  // Liste de toutes les conversations
  async index({ auth, view }: HttpContext) {
    const userId = auth.user!.id

    const contacts = await User.query()
      .whereIn('id', (query) => {
        query.from('messages')
          .select('id_destinataire')
          .where('id_expediteur', userId)
          .union((subQuery) => {
            subQuery.from('messages')
              .select('id_expediteur')
              .where('id_destinataire', userId)
          })
      })

    return view.render('pages/messages/index', { contacts })
  }

  // Afficher une discussion spécifique
  async show({ params, auth, view }: HttpContext) {
    const currentUser = auth.user!
    const otherUser = await User.findOrFail(params.id)

    const messages = await Message.query()
      .where((query) => {
        query.where('idExpediteur', currentUser.id).andWhere('idDestinataire', otherUser.id)
      })
      .orWhere((query) => {
        query.where('idExpediteur', otherUser.id).andWhere('idDestinataire', currentUser.id)
      })
      .orderBy('date_envoi', 'asc')

    return view.render('pages/messages/show', {
      title: `Discussion avec ${otherUser.name}`,
      otherUser,
      messages
    })
  }

  // Envoyer un message
  async store({ request, params, auth, response, session }: HttpContext) {
    const contenu = request.input('contenu')
    if (!contenu) return response.redirect().back()

    await Message.create({
      idExpediteur: auth.user!.id,
      idDestinataire: params.id,
      contenu
    })

    session.flash('success', 'Message envoyé.')
    return response.redirect().back()
  }
}
