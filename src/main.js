import Vue from 'vue'
import es from 'elasticsearch'
import Axios from 'axios'
import './plugins/vuetify'
import bookmarks from './plugins/bookmarks'
import advisors from './plugins/advisors'
import search from './plugins/search'
import { L, LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false

console.log('API base url: ' + process.env.VUE_APP_API_URL)

Vue.prototype.$http = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000
})

console.log('search url: ' + process.env.VUE_APP_ES_HOST)
Vue.prototype.$search = new es.Client({
  host: process.env.VUE_APP_ES_HOST,
  log: 'error'
})

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-popup', LPopup)

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//  iconUrl: require('leaflet/dist/images/marker-icon.png'),
//  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

Vue.use(bookmarks)
Vue.use(advisors)
Vue.use(search)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
