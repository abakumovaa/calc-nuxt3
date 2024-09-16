<template>
    <div class="w-full rounded m-1 p-3 text-end lead font-weight-bold text-white bg-vue-light">
      {{ value || 0 }}
    </div>
  </template>
  
  <script>
  export default {
    name: "Display", 
    props: {
      value: {
        type: String,
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
  