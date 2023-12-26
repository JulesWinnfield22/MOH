<script setup>
  import { openModal } from '@customizer/modal-x'

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
  console.log(filtered)
</script>
<template>
  <table class="overflow-hidden w-full rounded-md bg-white rate-table">
    <thead class="rate-head">
      <tr>
        <th>Age / Term</th>
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
        <td :key="rate.term" v-for="rate in filtered[age]">
          {{ rate.maleRate }}
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
    background-color: theme('colors.gray.800');
    color: #fff;
    text-align: center;
    padding: 0;
  }

  .rate-head tr {
    height: 3rem;
    background-color: theme('colors.gray.800');
    color: #fff;
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