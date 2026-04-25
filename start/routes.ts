import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import SearchesController from '#controllers/searches_controller'
import GrokController from '#controllers/groks_controller'
import GoogleAuthController from '#controllers/google_auths_controller'
import MessagesController from '#controllers/messages_controller'

router
  .group(() => {
    router.get('/', [controllers.Session, 'show'])
    router.post('login/e1', [controllers.Session, 'processStep1'])
    router.get('login/s3', [controllers.Session, 'showStep3'])
    router.post('login/e3', [controllers.Session, 'processStep3'])

    router.get('signup', [controllers.NewAccount, 'showStep1'])
    router.post('signup', [controllers.NewAccount, 'processStep1'])


    router.get('/google/redirect', [GoogleAuthController, 'redirect']).as('google.redirect')
    router.get('/google/callback', [GoogleAuthController, 'callback'])
  }).use(middleware.guest())

  router.group(() => {
    router.get('/password/reset', [controllers.ForgotPasswords, 'showStep1']).as('password.reset.step1')
    router.post('/password/reset', [controllers.ForgotPasswords, 'processStep1'])
    router.get('/password/reset/verify', [controllers.ForgotPasswords, 'showStep2']).as('password.reset.step2')
    router.post('/password/reset/verify', [controllers.ForgotPasswords, 'processStep2'])
    router.get('/password/reset/new', [controllers.ForgotPasswords, 'showStep3']).as('password.reset.step3')
    router.post('/password/reset/new', [controllers.ForgotPasswords, 'processStep3'])
  }).use(middleware.guest())

router
  .group(() => {
    // router.get('accueil', [controllers.NewAccount, 'accueil'])

    router.get('/profile/edit', [controllers.Profile, 'edit']).as('profile.edit')
    router.get('/profile/:id?', [controllers.Profile, 'show']).as('profile.show')
    router.put('/profile/edit', [controllers.Profile, 'update']).as('profile.update')
    router.post('/profile/privacy', [controllers.Profile, 'togglePrivacy']).as('profile.togglePrivacy')

    router.get('/find', [SearchesController, 'show']).as('search.show')
    router.get('/search', [SearchesController, 'index']).as('search.index')

    router.get('/messages', [MessagesController, 'index']).as('messages.index')
    router.get('/messages/:id', [MessagesController, 'show']).as('messages.show')
    router.post('/messages/:id', [MessagesController, 'store']).as('messages.store')

    router.post('logout', [controllers.Session, 'logout'])
  }).use(middleware.auth())

router.group(() => {
  router.post('/grok/generate', [GrokController, 'generate'])
  router.post('/grok/hashtags', [GrokController, 'hashtags'])
  router.get('/grok/analyze', [GrokController, 'analyze'])
}).prefix('ai').use(middleware.auth())
