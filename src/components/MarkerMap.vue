<template>
  <div style="height: 100%; width: 100%; margin: 0">
    <l-map :zoom="zoom" :center="latLng">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        :lat-lng="latLng">
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import { L } from 'vue2-leaflet'

export default {
  data () {
    return {
      zoom: 14,
      url:'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: L.latLng(48.1371181, 11.5755711)
    }
  },
  probs: {
    latLng: {
      default: [48.1371181, 11.5755711],
      type: Array
    }
  },
  watch: {
    latLng: function (val) {
      cosole.log('Wert' + val)
    }
  }  
}
</script>
