<template>
  <div class="container">
    <h1 class="title font-mix color-mix">
      <slot name="primary"></slot>
    </h1>
    <h1 class="title font-mix">
      <slot name="secondary"></slot>
    </h1>
  </div>
</template>
<script setup></script>

<style scoped>
h1.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
