<template>
    <div class="p-3 rounded" style="max-width: 400px; background: #002b72; margin: 50px 0px;">
      <div class="w-full rounded m-1 p-3 text-start lead font-weight-bolder text-white bg-vue-dark">
        <div v-for="(entry, index) in history" :key="index" class="mb-2">
          {{ entry }} 
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "History",
    props: {
      history: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-vue-dark {
    background: #0bbbef;
    font-weight: 600;
  }
  </style>
  