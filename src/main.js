/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import 'babel-polyfill'
import IdleVue from 'idle-vue'
import Cryptojs from 'vue-cryptojs'
import loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import money from 'v-money'
import { VueMaskDirective } from 'v-mask'
import excel from 'vue-excel-export'
 
Vue.use(excel)



Vue.directive('mask', VueMaskDirective);
// register directive v-money and component <money>
Vue.use(money, { precision: 2 })
import VueNumeric from 'vue-numeric'

Vue.use(VueNumeric)
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

Vue.filter('numFormat', numFormat(numeral));
Vue.use(loading)
Vue.use(Cryptojs)

// import request from '@/utils/request'
Vue.config.productionTip = false
// Vue.use(request)
Vue.use(ElementUI, {
  locale ,
  size: 'small'
})
//Vue.locale('en',enLocale)
const eventsHub = new Vue()
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 600000, // 1200000=20 , 600000=10 minustes
  store,
  startAtidel: false,
  events: ['mousemove', 'keydown', 'mousedown', 'touchstart']

})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

