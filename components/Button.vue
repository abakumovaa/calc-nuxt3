<template>
    <div
      class="lead text-white text-center m-1 py-2 bg-vue-light rounded hover-class"
      :class="{
        'bg-vue-special-btn': isSpecialButton,
      }"
      @click="handleClick"
    >
      {{ label }}
    </div>
  </template>
  
  <script>
  export default {
    name: "Button", 
    props: {
      label: {
        type: [String, Number],
        required: true,
      },
      isSpecialButton: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleClick() {
        this.$emit("buttonClick", this.label); 
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-vue-light {
    background: #0bbbef;
    font-weight: 600;
  }
  .hover-class:hover {
    cursor: pointer;
    background-color: #003a97;
  }
  .bg-vue-special-btn {
    background-color: #1f72b8;
  }
  </style>
  