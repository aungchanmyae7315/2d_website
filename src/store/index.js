import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import login from './module-login'
import core from './module-core'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      login,
      core
    }
  })

  return Store
}
