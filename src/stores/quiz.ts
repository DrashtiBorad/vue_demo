import { defineStore } from 'pinia'

export type Question = {
  id: number
  question: string
  options?: string[]
  answer: string | boolean
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris',
      },
      {
        id: 2,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NACI', 'Madrid'],
        answer: 'H2O',
      },
      {
        id: 3,
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        answer: 'Mars',
      },
      {
        id: 4,
        question: 'What is the value of π (pi) to two decimal places?',
        options: [3.14, 3.16, 3.12, 3.1],
        answer: 3.14,
      },
      {
        id: 5,
        question: 'Which language runs in a web browser?',
        options: ['Python', 'Java', 'C', 'JavaScript'],
        answer: 'JavaScript',
      },
      {
        id: 6,
        question: 'Which of these is the capital of Australia?',
        options: ['Sydney', ' Melbourne', 'Canberra', 'Brisbane'],
        answer: 'JavaScript',
      },
    ] as Question[],
    userAnswers: [] as (string | boolean)[],
  }),

  getters: {
    score(state): number {
      return state.userAnswers.reduce((acc, ans, idx) => {
        return ans === state.questions[idx]?.answer ? acc + 1 : acc
      }, 0)
    },
    total(state): number {
      return state.questions.length
    },
  },

  actions: {
    setAnswer(index: number, answer: string | boolean) {
      this.userAnswers[index] = answer
    },
    reset() {
      this.userAnswers = []
    },
  },
})
