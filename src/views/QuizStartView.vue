<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
    <p class="mb-6">Test your knowledge. Click start to begin.</p>
    <router-link to="/quiz/question/1" class="px-4 py-2 bg-blue-500 text-white rounded"
      >Start Quiz</router-link
    >
  </div>
</template>
