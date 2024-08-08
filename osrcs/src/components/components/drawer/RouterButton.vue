<script setup>
  import { ref, watch } from 'vue'
  import RecurButton from './RecurButton.vue'

  const props = defineProps({
    parentopen: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array,
      required: true
    }
  })

  const openedPath = ref('')
  const opened = ref(false)
  
  function changeOpened(name) {
    openedPath.value = name
    opened.value = !opened.value
  }
  watch(() => props.parentopen, () => {
    if(!props.parentopen) {
      opened.value = false
    }
  })

  console.log(props.routes)
</script>
<template>
  <div :class="['inner', !parentopen && 'hidden' ]" class="my-6 " :key="r.name" v-for="r in routes">
    <div :class="[$route.path == r.path && 'exact-active', $route.matched.slice(1).find(el => {
      return el.path == r.path
    }) && 'child-active']">
      <div @click="(ev) => {
          changeOpened(r?.path)
          r.path && $router.push(r.path)
        }" class="max-w-full w-full flex items-center justify-between" >
        <a class="max-w-full w-full flex gap-2 items-center" :href="r.path" @click="(ev) => {
          if(!r?.href)
            ev.preventDefault()
        }">
          <div class="w-[6px] h-[6px] rounded-full grid place-items-center dot"></div>
          <div class="flex-1 max-w-full w-full flex gap-4 items-center router-btn">
            <div class="w-4">
              <img :src="r.icon" />
            </div>
            <div style="width: calc(100% - 3.5rem)" class="truncate">
              {{ r?.name }}
            </div>
          </div>
        </a>
        <button :class="[ opened ? 'rotate-180' : 'rotate-0' ]" v-if="r?.children?.length" class="w-10 transition-transform duration-100 grid place-items-center text-black">
          <h-icon scale="1.2" name="pr-angle-down" />
        </button>
      </div>
      <RecurButton v-if="r?.children.length" :parentopen="openedPath == r.path && opened" :routes="r.children" />
    </div>
  </div>
</template>