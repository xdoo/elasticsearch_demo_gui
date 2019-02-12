<template>
  <l-map ref="myMap"></l-map>
</template>
<script>
export default {
  mounted () {
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
      })
    }
}
</script>

