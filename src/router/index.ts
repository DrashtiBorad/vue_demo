import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizStartView from '@/views/QuizStartView.vue'
import QuizQuestionView from '@/views/QuizQuestionView.vue'
import QuizResultsView from '@/views/QuizResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'QuizStartView',
      component: HomeView,
    },
    {
      path: '/quiz/question/:id',
      name: 'quiz-question',
      component: QuizQuestionView,
    },
    {
      path: '/quiz/results',
      name: 'quiz-results',
      component: QuizResultsView,
    },
  ],
})

export default router
