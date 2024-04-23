<template>
  <div class="border-l border-gray-300 absolute right-0 h-full w-[30rem] flex bg-form-modal-clr justify-center items-center"> 
    <div class='spiner-parent'>
      <div class='spiner-child'></div>
    </div>
  </div>
</template>

<style>
	.spiner-parent {
    width: 3rem;
    height: 3rem;
    padding: 1px;
    background-image: linear-gradient(180deg, rgb(var(--primary)), rgb(var(--button-clr)) 50%, white 50%);
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: "spin" 1s linear infinite;
  }

  .spiner-child {
    width: 100%;
    height: 100%;
    background-color: rgb(var(--form-modal-clr));
    border-radius: 50%;
    box-shadow: 0 0 0 1px #0002;
    border: 1px solid #0002 
  }

  @keyframes spin {
    to {
      rotate: 360deg
    }
  }
</style>