<script setup lang="ts"></script>

<template>
  <header class="w-full bg-blue-400 text-white py-4 shadow">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <router-link to="/" class="text-2xl font-bold hover:underline">Vue Quiz App</router-link>
      <slot name="right"></slot>
    </div>
  </header>
</template>
