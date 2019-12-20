import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as mutations from './mutations'
import * as actions from './actations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations:mutations,
  actions:actions,
  modules: {
  }
})
