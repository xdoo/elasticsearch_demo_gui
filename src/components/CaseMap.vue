<template>
  <div style="height: 100%; width: 100%; margin: 0">
    <l-map :zoom="zoom" :center="center" style="z-index: 1">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>
<script>
//import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';
import { L, LMap, LTileLayer, LPopup } from 'vue2-leaflet'
import { mapGetters } from 'vuex'

export default {
  components: {
    LMap,
    LTileLayer,
    LPopup
  },
  data () {
    return {
      zoom: 12,
      url:'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: L.latLng(48.1371181, 11.5755711)
    }
  },
  computed: {
    ...mapGetters(['query'])
  }
}
</script>


