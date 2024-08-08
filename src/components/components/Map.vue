<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useGeolocation } from "@/components/tables/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
const props = defineProps({
  latitude: {
    type: Number,
    default: 10.39,
  },
  longitude: {
    type: Number,
    default: 10.39,
  },
});

const GOOGLE_MAPS_API_KEY = "AIzaSyCIA2P9qeYtaXVPJHlGU5CF-mJNE8hpCV0";

const { coords } = useGeolocation();
// const currPos = computed(() => ({
//       lat: coords.value.latitude,
//       lng: coords.value.longitude
//     }))
const currPos = computed(() => ({
  lat: props?.latitude,
  lng: props?.longitude,
}));

console.log("current position", currPos.value);
const sp = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));
console.log("sssssss ss", sp.value);

const otherPos = ref(null);
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map = ref(null);
let clickListener = null;
let marker = null;

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 7,
  });
  marker = new google.maps.Marker({
    position: currPos.value,
    map: map.value,
  });
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

let line = null;
watch([map, currPos, otherPos], () => {
  if (line) line.setMap(null);
  if (map.value && otherPos.value != null) {
    line = new google.maps.Polyline({
      path: [sp.value, otherPos.value],
      map: map.value,
    });
  }
  // Update marker position if otherPos is set
  if (otherPos.value !== null) {
    marker.setPosition(currPos.value);
  }
});

const haversineDistance = (pos1, pos2) => {
  const R = 3958.8; // Radius of the Earth in miles
  const rlat1 = pos1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = pos2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};
const distance = computed(() =>
  otherPos.value === null ? 0 : haversineDistance(currPos.value, otherPos.value)
);
</script>

<template>
  <div class="flex my-6 relative w-full">
    <div ref="mapDiv" style="width: 74%; height: 40vh"></div>
    <div
      class="branch bg-white shadow-md relative max-h-[40vh] overflow-scroll"
    >
      <div class="flex flex-col space-y-4">
        <h2 class="pl-4">Branches</h2>

        <button class="mx-3 p-3 rounded-full bg-colorbranch flex space-x-9">
          <p class="opacity-60">1. Solomon Drug Shop</p>
          <div class="flex space-x-2">
            <p>|</p>
            <p class="text-primary font-bold">Map</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

.shadow-left {
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.5); /* Adjust the values as needed */
}
h2 {
  color: black;
  font: 800;
  font-size: 16px;
  font-family: "Ubuntu";
}
p {
  font: 800;
  font-size: 14px;
  font-family: "Ubuntu";
}
</style>
