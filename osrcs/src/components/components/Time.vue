<script setup>
import { onMounted, ref } from 'vue';


const currenTime = ref("");
const greeting = ref("");

const updateTime = () => {
  currenTime.value = formatTime(new Date());
  if (
    new Date().getHours().toString().padStart(2, "0") >= 5 &&
    new Date().getHours().toString().padStart(2, "0") < 12
  ) {
    greeting.value = "Good morning";
  } else if (
    new Date().getHours().toString().padStart(2, "0") >= 12 &&
    new Date().getHours().toString().padStart(2, "0") < 18
  ) {
    greeting.value = "Good afternoon";
  } else {
    greeting.value = "Good evening";
  }
};

onMounted(() => {
  setInterval(updateTime, 1000);
});

const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
</script>
<template>
	<div class="w-full flex flex-col items-center gap-[1rem] text-white">
			<div class="font-700 text-[2rem] leading-[2.2rem]">
				{{ currenTime }}
			</div>
			<div class="text-[4rem] leading-[4rem] satisfy">
				{{ greeting }}
			</div>
		</div>
</template>