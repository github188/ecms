import Vue from 'vue'
import Index from './Index'
import router from './router/router'
import mixin from '@/mixin'
import store from '@/vuex/'
import {ajax, command} from '@/utils/ajax'
import tableList from '@/components/table/TableList'
import nicescroll from 'nicescroll'
import VueFroala from 'vue-froala-wysiwyg'

import fetch from '@/utils/fetch'
window.fetch = fetch
window.Vue = Vue
import ElementUI from 'element-ui'
import 'static/css/common.css'
import 'element-ui/lib/theme-default/index.css'
import 'static/css/element-reset.css'
import 'static/css/style.less'

Vue.config.productionTip = false
Vue.prototype.ajax = ajax
Vue.prototype.command = command
Vue.prototype.tableList = tableList
Vue.mixin(mixin)
Vue.use(ElementUI)
Vue.use(VueFroala)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Index/>',
  components: {Index},
})
