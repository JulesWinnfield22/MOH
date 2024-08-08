<!-- FileUploadModal.vue -->
<script>
export default {
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      // Handle file upload logic here (e.g., send file to server)
      console.log('Selected file:', file)
      // Close modal after file selection (if needed)
      this.showModal = false
    },
  },
}
</script>

<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <input ref="fileInput" type="file" accept=".csv, .xls, .xlsx, .xlsm" @change="handleFileUpload">
      <!-- Add any additional modal UI here -->
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
