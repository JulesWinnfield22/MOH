// import modal from "./plugins/modal";
import ModalParent from "./ModalParent.vue";
import { useModal } from "./store/modal";
import modal from './plugins/modal'

function openModal(modalToOpen, data, cb) {
  const { openModal: OM } = useModal();
  OM(modalToOpen, data, cb);
}

function closeModal(response = false, sendResponse = true) {
  const { closeModal: CM } = useModal();
  CM(response, sendResponse);
}

function getModal(name) {
  const { getModal: GM } = useModal();
  return GM(name);
}

function loadModal(modal) {
  const { loadModal: GM } = useModal();
  GM(modal);
}

export default modal;
export { useModal, getModal, openModal, loadModal, closeModal, ModalParent };
