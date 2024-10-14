<template>
  <div class=" p-5 mx-3 px-12  items-center justify-center">
  <div class="font-bold text-center text-2xl">Requirements</div>
  <div class="text-center p-5">
    DOCUMENTS TO BE UPLOADED BY RESIDENTS
  </div>
 </div>
 <div class="text-center font-bold p-5">
  ፕሬዚደንት ተማሪዎች የስፖንሰርሺፕ ውል ሲስተም ላይ የሚጭኗቸው/Upload የሚያደርጓቸው ሠነዶች ዝርዝር
</div> 
<div class=" my-2 mx-32 p-2 font-sans font-normal text-[#0c0c0c]">
  <p class="mb-4">
    1ኛ) የተማሪው የታደሠ የቀበሌ መታወቂያ፤ መንጃ ፈቃድ ወይም ፓስፖርት፤
  </p>
  <p class="mb-4">
    2ኛ) ተማሪው ያገባ ከሆነ የባለቤቱ የታደሠ የቀበሌ መታወቂያ፤ መንጃ ፈቃድ ወይም ፓስፖርት፤
  </p>
  <p class="mb-4">
    3ኛ) ተማሪው ያገባ ከሆነ የጋብቻ የምስክር ወረቀት፤
  </p>
  <p class="mb-4">
    4ኛ) ተማሪው ያላገባ ከሆነ ስድስት ወር ያላለፈው ያላገባ ማስረጃ፤
  </p>
  <p class="mb-4">
    5ኛ) ተማሪው ያገባ ከሆነ ባለቤቱ እንዲፈርምለት/እንዲፈርምላት የወከለበት/የወከለችብት የውክልና ሠነድ፤
  </p>
  <p class="mb-4">
    6ኛ) በዚህ ሲስተም ላይ በተቀመጠው አግባብ የተሞላ እና በሚታይ መልኩ ስካን የተደረገ የስፖንሰርሺፕ የውል ሠነድ፤
  </p>
  <p class="reminder px-9 text-[#534646]">
    ማሳሰቢያ: 
  </p>
  <p class="text-[#534646] px-9">
    <span>ስካን ሲደረግ በማይታይ መልኩ ስካን ተደርጎ የተጫነ ማንኛውም ሠነድ ተቀባይነት የለውም፡፡</span>
  </p>
</div>
 <div class="  py-1">
 
 <div class="containers px-32 p-1">
     
      <div class="left-content py-0 px-32">
       
        <h2>Instruction video </h2>
        <p>Instruction.mp4</p>
      </div>
      <button class="download-btn" @click="">Play</button>
    </div> </div>
</template>

<script setup>
// Script logic if needed
</script>

<style scoped>
 .containers {
    display: flex;
    justify-content: space-between; /* Align items to the ends */
    align-items: center; /* Vertically center items */
    max-width: 70%;
    padding: 20px;
    margin: 0 100px;
    box-sizing: border-box;
    background-color: #e2e1e1;
    border: 1px solid #cce5ff;
    border-radius: 8px;
    max-height: 20%;
  }
.container {
 
 /* Align items to the ends */
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
