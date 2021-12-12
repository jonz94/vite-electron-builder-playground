<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const count = ref(0);
const fonts = ref<string[]>([]);
const selectedFont = ref('');
const size = ref(16);
const codeFont = computed(() => CSS.escape(selectedFont.value));
const code = `import { contextBridge } from 'electron';
import { getFonts } from 'font-list';

/**
 * Get font list of the system
 * @example
 * window.fontList.getFonts().then(fonts => console.log(fonts)).catch(error => console.log(error))
 */
contextBridge.exposeInMainWorld('fontList', {
  getFonts: new Promise<string[]>((resolve, reject) => {
    getFonts({ disableQuoting: true })
      .then((fonts) => resolve(fonts))
      .catch((error) => reject(error));
  }),
});
`;

onMounted(async () => {
  fonts.value = await window.fontList.getFonts;
});
</script>

<template>
  <fieldset class="p-4 m-8 border-2">
    <legend>Test Vue Reactivity</legend>
    <button @click="count++">count is: {{ count }}</button>
  </fieldset>

  <fieldset class="p-4 m-8 border-2 min-w-0">
    <legend>Font list</legend>
    <p class="flex gap-2">
      <label for="font">Font:</label>
      <select id="font" v-model="selectedFont" name="font">
        <option value="">Choose a font</option>
        <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
      </select>
      <label for="size">Size:</label>
      <input id="size" v-model="size" type="range" name="size" min="12" max="72" />
    </p>
    <pre
      class="py-8 m-4 bg-slate-800 text-white overflow-auto"
      :class="size < 32 ? 'px-8' : size < 48 ? 'px-10' : size < 64 ? 'px-12' : 'px-14'"
      :style="{ fontFamily: codeFont, fontSize: `${size}px` }"
      >{{ code }}</pre
    >
  </fieldset>
</template>
