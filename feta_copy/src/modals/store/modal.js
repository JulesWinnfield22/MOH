import {
  reactive,
  shallowRef,
  watch,
  defineAsyncComponent,
} from "vue";
import { defineStore } from "pinia";
import Spinner from '../Spinner.vue'

const defaultConfig = {
  mode: "mix"
}

export const useModal = defineStore("modal", () => {
  const modals = reactive([]);
  const fetchedModals = shallowRef([]);

  function openModal(modalToOpen, data, cb) {
    modals.forEach((modal) => {
      modal.active = false;
    });

    try {
      data = JSON.parse(JSON.stringify(data))
      modals.unshift({ modalToOpen, data, cb, active: true });
    } catch(err) {
      modals.unshift({ modalToOpen, data, cb, active: true });
    }
  }

  function closeModal(response, sendResponse = true) {
    let modal = modals[0];
    modals.shift();
    modals.length && (modals[0].active = true);

    if(![undefined, null].includes(response)) modal.cb && modal.cb(response);
  }

  function getModal(name) {
    return modals.find((modal) => modal.modalToOpen == name);
  }

  function loadModal(modal, name) {
    if (
      fetchedModals.value.find((mod) =>
        [name, modal.__name?.match(/.*\/(.+)\.mdl\.vue$/)?.[1]].includes(mod.id)
      )
    )
      return;

    fetchedModals.value = [
      ...fetchedModals.value,
      {
        id: name || modal.__name?.match(/.*\/(.+)\.mdl\.vue$/)?.[1] || "",
        modal,
      },
    ];
  }

  function fetchModal(name) {
    if (fetchedModals.value.find((modal) => modal.id == `${name}.mdl` || modal.id == name)) return;

    const asyncModules = import.meta.glob([`/**/*.amdl.vue`, "!./node_modules"]);
		let mods = {...asyncModules}

    
    const modalPath = Object.keys(mods).find(
      (module) => module.match(/.*\/(.+)\.amdl\.vue$/)?.[1] == name
    );

    if (!modalPath)
      return console.log(
        `%cno modal found with name [${name}]`,
        "font-size: 14px; color: red;"
      );

    let modal = defineAsyncComponent({
     loader: () => mods[modalPath](),
     loadingComponent: Spinner
    })

    loadModal(modal, name);
  }

  watch(modals, (modals) => {
    if (modals?.[0]) fetchModal(modals?.[0]?.modalToOpen);
  });

  return { config: defaultConfig, modals, fetchedModals, openModal, closeModal, getModal, loadModal };
});
