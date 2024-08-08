<!-- SuccessModal.vue -->
<script>
export default {
  props: {
    showModal: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <div class="text-center">
        <p class="text-green-600 text-lg font-bold">
          Import Successful!
        </p>
        <button class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black overlay */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
