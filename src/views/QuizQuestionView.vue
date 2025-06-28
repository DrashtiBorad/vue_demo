<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const route = useRoute()
const router = useRouter()
const quiz = useQuizStore()

const questionIndex = computed(() => {
  const id = Number(route.params.id)
  return quiz.questions.findIndex((q) => q.id === id)
})

const question = computed(() => quiz.questions[questionIndex.value])

const selected = ref(quiz.userAnswers[questionIndex.value] ?? '')

watch(selected, (val) => {
  quiz.setAnswer(questionIndex.value, val)
})

const totalSeconds = 120
const secondsLeft = ref(totalSeconds)
let timer: number | undefined

onMounted(() => {
  timer = setInterval(() => {
    secondsLeft.value--
    if (secondsLeft.value <= 0) {
      clearInterval(timer)
      router.push({ name: 'quiz-results' })
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function next() {
  if (questionIndex.value < quiz.questions.length - 1) {
    router.push({
      name: 'quiz-question',
      params: { id: quiz.questions[questionIndex.value + 1].id },
    })
  } else {
    router.push({ name: 'quiz-results' })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
      Time Left: {{ formatTime(secondsLeft) }}
    </div>
    <div v-if="question">
      <h2 class="text-2xl font-semibold mb-4">
        Question {{ questionIndex + 1 }} of {{ quiz.questions.length }}
      </h2>
      <div class="mb-4 text-lg">{{ question.question }}</div>
      <div v-if="question.options">
        <div v-for="option in question.options" :key="option" class="mb-2">
          <label class="inline-flex items-center cursor-pointer">
            <input type="radio" :value="option" v-model="selected" class="mr-2" />
            {{ option }}
          </label>
        </div>
      </div>
      <div v-else>
        <label class="inline-flex items-center mr-4 cursor-pointer">
          <input type="radio" :value="true" v-model="selected" class="mr-2" /> True
        </label>
        <label class="inline-flex items-center cursor-pointer">
          <input type="radio" :value="false" v-model="selected" class="mr-2" /> False
        </label>
      </div>
      <button
        class="mt-6 px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        :disabled="selected === ''"
        @click="next"
      >
        {{ questionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish' }}
      </button>
    </div>
    <div v-else>
      <p>Question not found.</p>
    </div>
  </div>
</template>
