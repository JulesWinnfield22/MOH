import { defineStore } from "pinia";
import { ref } from "vue";

export const usePrograms = defineStore("programsStore", () => {
  const programs = ref([]);

  function set(data) {
    programs.value = data;
  }

  function getAll() {
    return programs.value;
  }

  function remove(id) {
    const idx = programs.value.findIndex((el) => el.programUuid == id);
    if (idx > -1) {
      programs.value.splice(idx, 1);
    }
  }

  function add(program) {
    programs.value.unshift(program);
  }

  function update(id, data) {
    const idx = programs.value.findIndex((el) => el.programUuid == id);
    if (idx > -1) {
      programs.value.splice(idx, 1, data);
    }
  }

  return {
    set,
    add,
    remove,
    update,
    getAll,
    programs,
  };
});
