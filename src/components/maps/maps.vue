<template>
  <GmapMap
    :center="center"
    :zoom="7"
    map-type-id="roadmap"
    style="width: 100%; height: 100vh;border-radius: 5px"
    v-if="lat && lng "
  >
    <GmapMarker
      :clickable="true"
      :draggable="true"
      :key="index"
      :position="m.position"
      @click="center=m.position"
      v-for="(m, index) in markers"
    />
    <GmapCircle
      :center="pin.position"
      :key="radiusIndex"
      :options="{
                  fillColor:'#2196f3',
                  fillOpacity:0.35,
                  strokeWeight: 2,
                  strokeColor:'#2196f3'
                }"
      :radius="radiusG"
      :visible="true"
      v-for="(pin, radiusIndex) in markers"
    ></GmapCircle>
  </GmapMap>
</template>

<script>
export default {
  name: "maps",
  props: ["lat", "lng", "radius", "showRadius"],
  data: function() {
    return {
      center: { lat: this.lat, lng: this.lng },
      markers: [
        {
          position: { lat: this.lat, lng: this.lng }
        }
      ],
      radiusG: this.radius ? this.radius * 1000 : 1000
    };
  }
};
</script>
