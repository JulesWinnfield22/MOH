<script setup>
  import { openModal } from '@customizer/modal-x'
  import Term from '../components/Term.vue'
import { nextTick, ref } from 'vue';

  const data = []
  const term = 5
  const age = 65

  for(let i = term; i <= 20; i++) {
    for(let j = 20; j <= age; j++) {
      data.push(
      {
        id: i * j,
        term: i,
        age: j,
        maleRate: 20.0,
        femaleRate: 23.0,
      })
    }
  }

  const filtered = data.reduce((state, payload) => {
    if(state[payload.age]) {
      state[payload.age].push(payload)
    } else {
      state[payload.age] = []
      state[payload.age].push(payload)
    }
    return state
  }, {})

  const terms = filtered[Object.keys(filtered)[0]].map(el => el.term)

  
  let cells
  let selected = ref(false)
  function drawLines(rate) {
    let selectables = ''
    // setTimeout(() => {
    if(cells) {
      cells.forEach(element => {
        element.style.removeProperty('background-color')
      });
    }

    for(let i = rate.age - 1; i >= 20; i--) {
      selectables += `.rate-${i}-${rate.term},`
    }
    
    for(let j = rate.term - 1; j >= 5 && j > 0; j--) {
      selectables += `.rate-${rate.age}-${j},`
    }
    
    cells = [...document.querySelectorAll(selectables.replace(/,$/, ''))]

    cells.forEach(element => {
      element.style.setProperty('background-color', '#00f1')
    });
  }

  function hovering(rate) {
    if(selected.value) return
    drawLines(rate)
  }


</script>
<template>
  <table class="overflow-hidden w-full rounded-md bg-white rate-table">
    <thead class="rate-head">
      <tr>
        <th></th>
        <th class="border-b" :colspan="terms.length + 1">
          Term
        </th>
      </tr>
      <tr>
        <th>Age Next Birthday</th>
        <th :key="term" v-for="term in terms">
          {{ term }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr :key="age" v-for="age in Object.keys(filtered)">
        <td class="age">
          {{ age }}
        </td>
        <td class="p-0 flex-1" :key="rate.term" v-for="rate in filtered[age]">
          <Term @blured="selected = false" @selected="() => {
            selected = true
            drawLines(rate)
          }" @mouseover="() => hovering(rate)" :rate="rate" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
  .rate-table th {
    position: relative;
    padding: .25rem;
    overflow: hidden;
  }
  
  .age {
    background-color: theme('colors.white');
    color: #222;
    text-align: center;
    padding: 0;
    min-width: 3rem;
  }

  .rate-head tr {
    height: 3rem;
    background-color: theme('colors.white');
    color: #222;
  }
  
  .rate-table th:not(:last-of-type)::after {
    content: '';
    position: absolute;
    left: 100%;
    transform: translate(-100%, -50%);
    top: 50%;
    height: 60%;
    width: 1px;
    background-color: #fff5;
  }
</style>