<template>
  <div class="container p-5">
    <div class="left-content p-5">
      <h2>Agency agreement Format</h2>
      <p>Agency_document.docx</p>
    </div>
    <button class="download-btn" @click="$router.push('/Requirement')">Download</button>
  </div>
  <div class="containers my-8 p-5 font-sans text-[#79838C]">
    <!-- Left Side Section -->
    <section class="left-section my-3">
      <h3 class="font-bold">Note for Married Students</h3>
      <p class="my-3">I have entered into this educational contractual agreement under the sponsorship of the Ministry of Health. When I completed my studies, I shall perform my duties to the place where the Ministry assigns me and give service to period mentioned in the contract. I agree that the education and training directive issued by the Ministry of Health shall be applicable to the contract. If I fail to comply with contract, I agree to pay the amount mentioned in the contract.</p>
      <p class="my-3">I have entered into this educational contractual agreement under the sponsorship of the Ministry of Health. When I completed my studies, I shall perform my duties to the place where the Ministry assigns me and give service to period mentioned in the contract. I agree that the education and training directive issued by the Ministry of Health shall be applicable to the contract. If I fail to comply with contract, I agree to pay the amount mentioned in the contract.</p>
      <p class="my-3">I have entered into this educational contractual agreement under the sponsorship of the Ministry of Health. When I completed my studies, I shall perform my duties to the place where the Ministry assigns me and give service to period mentioned in the contract. I agree that the education and training directive issued by the Ministry of Health shall be applicable to the contract. If I fail to comply with contract, I agree to pay the amount mentioned in the contract.</p>
    </section>

    <!-- Right Side Section -->
    <section class="right-section my-3">
      <div class="right-content">
        <h3 class="font-bold">Introduction</h3>
        <p class="my-3">I have entered into this educational contractual agreement under the sponsorship of the Ministry of Health. When I completed my studies, I shall perform my duties to the place where the Ministry assigns me and give service to period mentioned in the contract. I agree that the education and training directive issued by the Ministry of Health shall be applicable to the contract. If I fail to comply with contract, I agree to pay the amount mentioned in the contract.</p>
        <h3 class="font-bold">Introduction</h3>
        <p class="my-3">I have entered into this educational contractual agreement under the sponsorship of the Ministry of Health. When I completed my studies, I shall perform my duties to the place where the Ministry assigns me and give service to period mentioned in the contract. I agree that the education and training directive issued by the Ministry of Health shall be applicable to the contract. If I fail to comply with contract, I agree to pay the amount mentioned in the contract.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
// Script logic if needed
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between; /* Align items to the ends */
  align-items: center; /* Vertically center items */
  max-width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #e2e1e1;
  border: 1px solid #cce5ff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.left-content {
  display: flex;
  flex-direction: column;
}

.left-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.left-content p {
  color: #4a4a4a;
  margin: 0;
}

.download-btn {
  padding: 0.5rem 1rem;
  background-color: #092537;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #0d344d;
}

.containers {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.left-section,
.right-section {
  width: 45%; /* Adjust the width as needed */
}

.left-section {
  text-align: left;
}

.right-section {
  display: flex;
  justify-content: center; /* Center the content in the section */
}

.right-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
  text-align: left; /* Ensure text alignment is left */
  max-width: 80%; /* Adjust width to control alignment */
}
</style>
