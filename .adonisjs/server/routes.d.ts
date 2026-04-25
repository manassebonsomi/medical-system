import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'session.show': { paramsTuple?: []; params?: {} }
    'session.process_step_1': { paramsTuple?: []; params?: {} }
    'session.show_step_3': { paramsTuple?: []; params?: {} }
    'session.process_step_3': { paramsTuple?: []; params?: {} }
    'new_account.show_step_1': { paramsTuple?: []; params?: {} }
    'new_account.process_step_1': { paramsTuple?: []; params?: {} }
    'google.redirect': { paramsTuple?: []; params?: {} }
    'google_auth.callback': { paramsTuple?: []; params?: {} }
    'password.reset.step1': { paramsTuple?: []; params?: {} }
    'forgot_passwords.process_step_1': { paramsTuple?: []; params?: {} }
    'password.reset.step2': { paramsTuple?: []; params?: {} }
    'forgot_passwords.process_step_2': { paramsTuple?: []; params?: {} }
    'password.reset.step3': { paramsTuple?: []; params?: {} }
    'forgot_passwords.process_step_3': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.togglePrivacy': { paramsTuple?: []; params?: {} }
    'search.show': { paramsTuple?: []; params?: {} }
    'search.index': { paramsTuple?: []; params?: {} }
    'messages.index': { paramsTuple?: []; params?: {} }
    'messages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'messages.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'session.logout': { paramsTuple?: []; params?: {} }
    'groks.generate': { paramsTuple?: []; params?: {} }
    'groks.hashtags': { paramsTuple?: []; params?: {} }
    'groks.analyze': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'session.show': { paramsTuple?: []; params?: {} }
    'session.show_step_3': { paramsTuple?: []; params?: {} }
    'new_account.show_step_1': { paramsTuple?: []; params?: {} }
    'google.redirect': { paramsTuple?: []; params?: {} }
    'google_auth.callback': { paramsTuple?: []; params?: {} }
    'password.reset.step1': { paramsTuple?: []; params?: {} }
    'password.reset.step2': { paramsTuple?: []; params?: {} }
    'password.reset.step3': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'search.show': { paramsTuple?: []; params?: {} }
    'search.index': { paramsTuple?: []; params?: {} }
    'messages.index': { paramsTuple?: []; params?: {} }
    'messages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'groks.analyze': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'session.show': { paramsTuple?: []; params?: {} }
    'session.show_step_3': { paramsTuple?: []; params?: {} }
    'new_account.show_step_1': { paramsTuple?: []; params?: {} }
    'google.redirect': { paramsTuple?: []; params?: {} }
    'google_auth.callback': { paramsTuple?: []; params?: {} }
    'password.reset.step1': { paramsTuple?: []; params?: {} }
    'password.reset.step2': { paramsTuple?: []; params?: {} }
    'password.reset.step3': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'search.show': { paramsTuple?: []; params?: {} }
    'search.index': { paramsTuple?: []; params?: {} }
    'messages.index': { paramsTuple?: []; params?: {} }
    'messages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'groks.analyze': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'session.process_step_1': { paramsTuple?: []; params?: {} }
    'session.process_step_3': { paramsTuple?: []; params?: {} }
    'new_account.process_step_1': { paramsTuple?: []; params?: {} }
    'forgot_passwords.process_step_1': { paramsTuple?: []; params?: {} }
    'forgot_passwords.process_step_2': { paramsTuple?: []; params?: {} }
    'forgot_passwords.process_step_3': { paramsTuple?: []; params?: {} }
    'profile.togglePrivacy': { paramsTuple?: []; params?: {} }
    'messages.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'session.logout': { paramsTuple?: []; params?: {} }
    'groks.generate': { paramsTuple?: []; params?: {} }
    'groks.hashtags': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profile.update': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}