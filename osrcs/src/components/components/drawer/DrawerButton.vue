<script setup>
import { h, ref, watch } from "vue";
import RecurButton from "./RecurButton.vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps({
  routes: {
    type: Array,
    required: true,
  },
  parentopen: {
    type: Boolean,
    default: false,
  },
});

const opened = ref(false);
const openedPath = ref(props.routes?.[0].path);
function changeOpened(name) {
  openedPath.value = name;
  opened.value = !opened.value;
}

watch(
  () => props.parentopen,
  () => {
    if (!props.parentopen) {
      opened.value = false;
    }
  }
);

const pattern = [0, 3, 5, 7, 9];

const route = useRoute();
</script>
<template>
  <div class="max-w-drawer-width flex flex-col gap-8">
    <div
      class="relative w-full"
      :class="[
        $route.path == r.path && 'exact-active',
        $route.matched.slice(1).find((el) => {
          return el?.path == r?.path;
        }) && 'child-active',
      ]"
      :key="r.name"
      v-for="(r, idx) in routes"
    >
      <div
        @click="
          (ev) => {
            changeOpened(r?.path);
            r.path && $router.push(r.path);
          }
        "
        class="max-w-full w-full flex items-center justify-between"
      >
        <a
          class="max-w-full w-full flex gap-2 items-center"
          :href="r.path"
          @click="
            (ev) => {
              if (!r?.href) ev.preventDefault();
            }
          "
        >
          <div
            class="w-[6px] h-[6px] rounded-full grid place-items-center dot"
          ></div>
          <div
            class="flex-1 max-w-full w-full flex gap-4 items-center router-btn"
          >
            <div class="w-4">
              <img :src="r.icon" />
            </div>
            <div style="width: calc(100% - 3.5rem)" class="truncate">
              {{ r?.name }}
            </div>
          </div>
        </a>
        <button
          :class="[opened ? 'rotate-180' : 'rotate-0']"
          v-if="r?.children?.length"
          class="w-10 transition-transform duration-100 grid place-items-center text-black"
        >
          <h-icon scale="1.2" name="pr-angle-down" />
        </button>
      </div>
      <div
        class="border-b border-[#7063EE]/20 py-2 ml-12 mr-4"
        v-if="pattern.includes(idx)"
      ></div>
      <RecurButton
        v-if="r?.children?.length"
        :parentopen="r?.path == openedPath && opened"
        :routes="r?.children || []"
      />
    </div>
  </div>
</template>
<style>
.inner {
  padding-left: 2rem;
}

.hidden {
  display: none;
}

.dot {
  background-color: rgba(var(--primary) / 0.3);
}

.exact-active .dot,
.child-active .dot {
  width: 8px;
  height: 8px;
  background-color: rgba(var(--primary));
}

.exact-active .router-btn,
.child-active .router-btn {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  color: white;
}

.child-active .router-btn {
  background-color: #0004;
}

.exact-active .router-btn {
  background-color: rgba(var(--primary));
}
</style>
