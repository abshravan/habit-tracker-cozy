import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority?: 'high' | 'medium' | 'low'
  category?: string
  date?: string
}

export interface Goal {
  id: string
  title: string
  description: string
  type: 'short-term' | 'long-term'
  progress: number
  targetDate?: string
}

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  notes?: string
}

export interface TimeBlock {
  id: string
  title: string
  startTime: string
  endTime: string
  date: string
}

export interface Habit {
  id: string
  name: string
  category: string
  frequency: 'daily' | 'weekly' | 'monthly'
  completedDates: string[]
  streak: number
  color: string
}

export interface Meal {
  id: string
  date: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  description: string
}

export interface Exercise {
  id: string
  date: string
  type: string
  duration: number
  notes?: string
}

export interface Expense {
  id: string
  date: string
  category: string
  amount: number
  description: string
}

export interface Reflection {
  id: string
  date: string
  type: 'work' | 'personal'
  achievements: string[]
  challenges: string[]
  improvements: string[]
  gratitude?: string[]
  mood?: number
}

interface AppState {
  // Work Planner
  workTodos: Todo[]
  workGoals: Goal[]
  meetings: Meeting[]
  timeBlocks: TimeBlock[]
  workReflections: Reflection[]

  // Personal Planner
  personalTodos: Todo[]
  personalGoals: Goal[]
  meals: Meal[]
  exercises: Exercise[]
  expenses: Expense[]
  personalReflections: Reflection[]

  // Habits
  habits: Habit[]

  // Actions - Work
  addWorkTodo: (todo: Omit<Todo, 'id'>) => void
  toggleWorkTodo: (id: string) => void
  deleteWorkTodo: (id: string) => void
  addWorkGoal: (goal: Omit<Goal, 'id'>) => void
  updateWorkGoalProgress: (id: string, progress: number) => void
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void
  addTimeBlock: (block: Omit<TimeBlock, 'id'>) => void
  addWorkReflection: (reflection: Omit<Reflection, 'id'>) => void

  // Actions - Personal
  addPersonalTodo: (todo: Omit<Todo, 'id'>) => void
  togglePersonalTodo: (id: string) => void
  deletePersonalTodo: (id: string) => void
  addPersonalGoal: (goal: Omit<Goal, 'id'>) => void
  updatePersonalGoalProgress: (id: string, progress: number) => void
  addMeal: (meal: Omit<Meal, 'id'>) => void
  addExercise: (exercise: Omit<Exercise, 'id'>) => void
  addExpense: (expense: Omit<Expense, 'id'>) => void
  addPersonalReflection: (reflection: Omit<Reflection, 'id'>) => void

  // Actions - Habits
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates' | 'streak'>) => void
  toggleHabitCompletion: (id: string, date: string) => void
  deleteHabit: (id: string) => void
}

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      workTodos: [],
      workGoals: [],
      meetings: [],
      timeBlocks: [],
      workReflections: [],
      personalTodos: [],
      personalGoals: [],
      meals: [],
      exercises: [],
      expenses: [],
      personalReflections: [],
      habits: [],

      // Work actions
      addWorkTodo: (todo) =>
        set((state) => ({
          workTodos: [...state.workTodos, { ...todo, id: generateId() }],
        })),

      toggleWorkTodo: (id) =>
        set((state) => ({
          workTodos: state.workTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteWorkTodo: (id) =>
        set((state) => ({
          workTodos: state.workTodos.filter((todo) => todo.id !== id),
        })),

      addWorkGoal: (goal) =>
        set((state) => ({
          workGoals: [...state.workGoals, { ...goal, id: generateId() }],
        })),

      updateWorkGoalProgress: (id, progress) =>
        set((state) => ({
          workGoals: state.workGoals.map((goal) =>
            goal.id === id ? { ...goal, progress } : goal
          ),
        })),

      addMeeting: (meeting) =>
        set((state) => ({
          meetings: [...state.meetings, { ...meeting, id: generateId() }],
        })),

      addTimeBlock: (block) =>
        set((state) => ({
          timeBlocks: [...state.timeBlocks, { ...block, id: generateId() }],
        })),

      addWorkReflection: (reflection) =>
        set((state) => ({
          workReflections: [...state.workReflections, { ...reflection, id: generateId() }],
        })),

      // Personal actions
      addPersonalTodo: (todo) =>
        set((state) => ({
          personalTodos: [...state.personalTodos, { ...todo, id: generateId() }],
        })),

      togglePersonalTodo: (id) =>
        set((state) => ({
          personalTodos: state.personalTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deletePersonalTodo: (id) =>
        set((state) => ({
          personalTodos: state.personalTodos.filter((todo) => todo.id !== id),
        })),

      addPersonalGoal: (goal) =>
        set((state) => ({
          personalGoals: [...state.personalGoals, { ...goal, id: generateId() }],
        })),

      updatePersonalGoalProgress: (id, progress) =>
        set((state) => ({
          personalGoals: state.personalGoals.map((goal) =>
            goal.id === id ? { ...goal, progress } : goal
          ),
        })),

      addMeal: (meal) =>
        set((state) => ({
          meals: [...state.meals, { ...meal, id: generateId() }],
        })),

      addExercise: (exercise) =>
        set((state) => ({
          exercises: [...state.exercises, { ...exercise, id: generateId() }],
        })),

      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: generateId() }],
        })),

      addPersonalReflection: (reflection) =>
        set((state) => ({
          personalReflections: [...state.personalReflections, { ...reflection, id: generateId() }],
        })),

      // Habit actions
      addHabit: (habit) =>
        set((state) => ({
          habits: [...state.habits, { ...habit, id: generateId(), completedDates: [], streak: 0 }],
        })),

      toggleHabitCompletion: (id, date) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit

            const isCompleted = habit.completedDates.includes(date)
            const completedDates = isCompleted
              ? habit.completedDates.filter((d) => d !== date)
              : [...habit.completedDates, date].sort()

            // Calculate streak
            let streak = 0
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            for (let i = 0; i < 365; i++) {
              const checkDate = new Date(today)
              checkDate.setDate(checkDate.getDate() - i)
              const dateStr = checkDate.toISOString().split('T')[0]

              if (completedDates.includes(dateStr)) {
                streak++
              } else if (i > 0) {
                break
              }
            }

            return { ...habit, completedDates, streak }
          }),
        })),

      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
    }),
    {
      name: 'cozy-habit-tracker-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
