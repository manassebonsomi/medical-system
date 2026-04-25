import type { HttpContext } from '@adonisjs/core/http'
import type { MultipartFile } from '@adonisjs/core/bodyparser'
import User from '#models/user'
import UploadService from '#services/upload_service'
import { inject } from '@adonisjs/core'
import Tweet from '#models/tweet'
import db from '@adonisjs/lucid/services/db'
import { updateProfileValidator } from '#validators/profilValidator'

@inject()
export default class ProfileController {
  async show({ params, view, auth, response }: HttpContext) {
    const userId = params.id || auth.user!.id

    if (Number.isNaN(userId)) {
      return response.badRequest('Utilisateur invalide')
    }

    const userProfile = await User.query()
      .where('id', userId)
      .withCount('tweets')
      .withCount('abonnements')
      .withCount('abonnes')
      .firstOrFail()

    const currentUserId = auth.user!.id
    const targetUserId = userId
    const isOwner = currentUserId === userProfile.id

    // Vérification des relations (Follow et Block)
    let isFollowing = false
    let isBlockedByMe = false
    let isPendingRequest = false

    if (!isOwner) {
      const followCheck = await auth.user!.related('abonnements')
        .query().where('id_following', userProfile.id).first()
      isFollowing = !!followCheck

      const blockCheck = await auth.user!.related('blockedUsers')
        .query().where('id_blocked', userProfile.id).first()
      isBlockedByMe = !!blockCheck

      // Vérifier si une demande est en attente
      if (userProfile.isPrivate && !isFollowing) {
        const reqCheck = await db.from('follow_requests')
          .where('follower_id', currentUserId)
          .where('following_id', userProfile.id)
          .first()
        isPendingRequest = !!reqCheck
      }
    }

    // Définir si on peut voir le contenu
    const canSeeContent = isOwner || !userProfile.isPrivate || isFollowing

    let feed: any[] = []

    // Exécuter la requête SQL UNIQUEMENT si autorisé et non bloqué
    if (canSeeContent && !isBlockedByMe) {
      const result = await db.rawQuery(`
        SELECT
          activity_id, tweet_id, actor_id, activity_at, type, quote_content, media_urls
        FROM (
          SELECT
            id as activity_id, id as tweet_id, id_user as actor_id, date_publication as activity_at, 'original' as type, NULL as quote_content,
            (SELECT string_agg(m.url_media, ',') FROM media m WHERE id_tweet = tweets.id) as media_urls
          FROM tweets WHERE id_user = :targetId
          UNION ALL
          SELECT
            id as activity_id, id_tweet as tweet_id, id_user as actor_id, date_retweet as activity_at, 'retweet' as type, contenu as quote_content,
            (SELECT string_agg(m.url_media, ',') FROM media m WHERE id_tweet = retweets.id_tweet) as media_urls
          FROM retweets WHERE id_user = :targetId
        ) as activities
        WHERE NOT EXISTS (
          SELECT 1 FROM blocks
          WHERE (id_blocker = :me AND id_blocked = :targetId) OR (id_blocker = :targetId AND id_blocked = :me)
        )
        ORDER BY activity_at DESC
      `, { targetId: targetUserId, me: currentUserId })

      const rows = Array.isArray(result.rows) ? result.rows : []
      feed = await Promise.all(rows.map(async (row: any) => {
        const tweet = await Tweet.query()
          .where('id', row.tweet_id)
          .preload('user')
          .preload('utilisateursLikes', (q) => q.where('users.id', currentUserId))
          .preload('utilisateursRetweets', (q) => q.where('id_user', currentUserId))
          .withCount('commentaires')
          .withCount('utilisateursRetweets', (q) => q.as('retweets_count'))
          .withCount('utilisateursLikes', (q) => q.as('likes_count'))
          .first()

        return { ...row, tweet, actor_name: userProfile.name }
      }))
    }

    return view.render('pages/profile', {
      userProfile,
      feed,
      isFollowing,
      isBlockedByMe,
      isOwner,
      canSeeContent,
      isPendingRequest
    })
  }

  async togglePrivacy({ auth, response, session }: HttpContext) {
    const user = auth.user!
    user.isPrivate = !user.isPrivate
    await user.save()

    const status = user.isPrivate ? 'privé' : 'public'
    session.flash('success', `Votre compte est désormais ${status}.`)
    return response.redirect().back()
  }

  async edit({ view, auth }: HttpContext) {
    return view.render('pages/profile_edit', { user: auth.user! })
  }

  // Constructeur pour le service
  constructor(protected uploadService: UploadService) {}

  async update({ request, auth, response, session }: HttpContext) {
    const user = auth.user!

    /*
    const updateProfileValidator = vine.compile(
      vine.object({
        name: vine.string().trim().minLength(3).maxLength(50),
        pseudo: vine.string().trim().minLength(3).maxLength(20),
        email: vine.string().email().trim(),
        bio: vine.string().trim().maxLength(160).optional(),
        address: vine.string().trim().optional(),
        password: vine.string().minLength(8).confirmed().optional(),
        avatar: vine.file({
          size: '2mb',
          extnames: ['jpg', 'jpeg', 'png', 'webp'],
        }).optional(),
      })
    )
    */

    let payload: { name: string; pseudo: string; email: string; bio?: string; address?: string; password?: string; avatar?: MultipartFile }

    try {
        payload = await request.validateUsing(updateProfileValidator)
     } catch (error){
        session.flash('error', 'Informations erronées.')
        return response.redirect().back()
        }

        if (payload.avatar) {
          // Supprimer l'ancien avatar s'il existe
          if (user.avatarUrl) {
            await this.uploadService.deleteAvatar(user.avatarUrl)
          }
          // Uploader le nouveau et mettre à jour le modèle
          user.avatarUrl = await this.uploadService.uploadAvatar(payload.avatar)
        }

    // Mise à jour des infos de base
    user.name = payload.name
    user.pseudo = payload.pseudo
    user.email = payload.email
    user.bio = payload.bio || null
    user.address = payload.address || null

    // Gestion du mot de passe (uniquement s'il est rempli)
    if (payload.password) {
      user.password = payload.password
    }

    await user.save()

    session.flash('success', 'Profil mis à jour avec succès !')
    return response.redirect().toRoute('profile.show', { id: user.id })
  }
}
