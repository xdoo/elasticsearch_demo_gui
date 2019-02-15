import Vue from 'vue'
import es from 'elasticsearch'
import axios from 'axios'
import './plugins/vuetify'
import { L } from 'vue2-leaflet';
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.prototype.$search = new es.Client({
  host: 'localhost:5601',
  log: 'trace'
})

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
