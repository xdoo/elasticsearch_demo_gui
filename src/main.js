import Vue from 'vue'
import es from 'elasticsearch'
import axios from 'axios'
import './plugins/vuetify'
import { L, LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.prototype.$search = new es.Client({
  host: 'localhost:9200',
  log: 'error'
})

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-popup', LPopup)

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
