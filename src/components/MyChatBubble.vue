<template>
  <div class="w-full max-w-[320px] mb-3">
    <div
      class="leading-1.5 p-4 border-gray-200 bg-purple-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
    >
      <p class="text-sm font-normal text-gray-900 dark:text-white">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
});
</script>
