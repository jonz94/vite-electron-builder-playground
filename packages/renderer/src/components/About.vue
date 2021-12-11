<script setup lang="ts">
const versions = window.versions;
</script>

<template>
  <div class="grid flex-1 gap-y-8 place-content-center">
    <h2 class="text-2xl font-bold text-center">Lib versions</h2>
    <div class="grid justify-center text-left">
      <ul aria-labelledby="versions">
        <li v-for="(version, lib) in versions" :key="lib">
          <strong>{{ lib }}</strong> : v{{ version }}
        </li>
      </ul>
    </div>
  </div>
</template>
