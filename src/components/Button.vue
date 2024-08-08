<script setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "sm",
  },
  type: {
    type: String,
  },
});

const rippleBtn = ref();
const rippleChild = ref()

function ripple(ev) {
  const x = ev.layerX;
  const y = ev.layerY;
  const width = rippleBtn.value.clientWidth

  rippleChild.value.style.setProperty("--x", `${x}px`);
  rippleChild.value.style.setProperty("--y", `${y}px`);
  rippleChild.value.style.setProperty("--btnWidth", `${width}px`);
  rippleChild.value.classList.add("__ripple_animation");

  setTimeout(() => {
    rippleChild.value && rippleChild.value.classList.remove("__ripple_animation");
  }, 400);
}

onMounted(() => {
  rippleBtn.value.addEventListener("click", ripple);
})

onBeforeUnmount(() => {
  rippleBtn.value.removeEventListener("click", ripple);
})
</script>
<template>
  <button
    ref="rippleBtn"
    :class="[$style?.[size], $style?.[type]]"
    class="__ripple px-4 py-1 rounded capitalize"
  >
    <slot v-if="!pending"></slot>
    <p v-else>...</p>
    <div ref="rippleChild" class="__ripple_child"></div>
  </button>
</template>

<style>
.__ripple {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.__ripple .__ripple_child {
  z-index: -1;
  position: absolute;
  width: 0px;
  height: 0px;
  background-color: #ddd;
  border-radius: 99999px;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
}

.__ripple_animation {
  top: var(--y);
  left: var(--x);
  animation: ripple 0.4s ease-out;
}

@keyframes ripple {
  100% {
    width: var(--btnWidth);
    height: var(--btnWidth);
    opacity: 0;
  }
}
</style>
<style module>
.xs {
  width: auto;
  height: auto;
}

.sm {
  min-width: 3.6rem;
  min-height: 2.375rem;
}

.md {
  min-width: 6.8rem;
  min-height: 3rem;
}

.lg {
  min-width: 6.8rem;
  min-height: 3.625rem;
}

.secondary {
  @apply bg-secondary text-white;
}

.primary {
  @apply bg-primary text-white;
}
</style>
