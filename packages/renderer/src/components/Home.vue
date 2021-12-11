<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const count = ref(0);

const rawString = ref('Hello World');
const hashedString = computed(() => window.nodeCrypto.sha256sum(rawString.value));

onMounted(async () => {
  window.fontList.getFonts.then((fonts) => console.log(fonts)).catch((error) => console.error(error));
});
</script>

<template>
  <fieldset class="p-4 m-8 border-2">
    <legend>Test Vue Reactivity</legend>
    <button @click="count++">count is: {{ count }}</button>
  </fieldset>

  <fieldset class="p-4 m-8 border-2">
    <legend>Test Node.js API</legend>
    <label>
      Raw value
      <input v-model="rawString" type="text" />
    </label>
    <br />
    <label>
      Hashed by node:crypto
      <input v-model="hashedString" type="text" readonly />
    </label>
  </fieldset>

  <fieldset class="p-4 m-8 border-2">
    <legend>Font list</legend>
  </fieldset>
</template>
