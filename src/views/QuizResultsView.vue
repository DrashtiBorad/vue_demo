<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz'

const quiz = useQuizStore()
const { score, total, questions, userAnswers } = storeToRefs(quiz)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h2 class="text-2xl font-semibold mb-4">Quiz Results</h2>
    <p class="mb-2">
      Your score: <span class="font-bold">{{ score }} / {{ total }}</span>
    </p>
    <div class="w-full max-w-md mt-6">
      <h3 class="text-lg font-semibold mb-2">Summary:</h3>
      <ul>
        <li v-for="(q, idx) in questions" :key="q.id" class="mb-2">
          <div class="font-medium">Q{{ idx + 1 }}: {{ q.question }}</div>
          <div>
            Your answer:
            <span :class="userAnswers[idx] === q.answer ? 'text-green-600' : 'text-red-600'">{{
              userAnswers[idx] ?? 'No answer'
            }}</span>
          </div>
          <div v-if="userAnswers[idx] !== q.answer" class="text-sm text-gray-500">
            Correct answer: {{ q.answer }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
