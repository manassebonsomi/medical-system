import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {

    async accueil({ view }: HttpContext) {
        return view.render('pages/home')
      }

    async prediction({ view }: HttpContext) {
        return view.render('pages/prediction')
      }


}