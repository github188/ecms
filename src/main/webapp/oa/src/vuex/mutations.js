import * as types from './mutation-types'
import router from '@/router/router'
import {setStore, getStore, removeStore} from '@/utils/localStorage'

export default {
  [types.LOG_IN](state, mount) {
    const {userId, token, realname, result} = mount.content
    const {t, v, sign} = result
    setStore('authorization', userId + '_' + token)
    setStore('u', userId)
    setStore('realname', realname)
    state.authorization = userId + '_' + token
    state.u = userId
    state.t = t
    state.realname = realname
  },
  [types.LOG_OUT](state) {
    removeStore('authorization')
    removeStore('realname')
    removeStore('u')
    removeStore('t')
    removeStore('v')
    state.authorization = null
    state.u = null
    state.t = null
    state.realname = null
    router.push('/')
  },
}
