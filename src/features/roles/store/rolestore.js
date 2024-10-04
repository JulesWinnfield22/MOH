import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRoles = defineStore('rolesStore', () => {
  const roles = ref([]);

  function set(data) {
    console.log(data);

    roles.value = data;
  }

  function getAll() {
    return roles.value;
  }

  function remove(id) {
    const idx = roles.value.findIndex((el) => el.privilegeUuid == id);
    if (idx > -1) {
      roles.value.splice(idx, 1);
    }
  }

  function add(privilege) {
    roles.value.unshift(privilege);
  }

  function update(id, data) {
    const idx = roles.value.findIndex((el) => el.privilegeUuid == id);
    if (idx > -1) {
      roles.value.splice(idx, 1, data);
    }
  }

  return {
    set,
    add,
    remove,
    update,
    getAll,
    roles,
  };
});
