import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Target,
  UtensilsCrossed,
  Dumbbell,
  DollarSign,
  Heart,
  Smile,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { format } from 'date-fns'

const PersonalPlanner = () => {
  const {
    personalTodos,
    personalGoals,
    meals,
    exercises,
    expenses,
    addPersonalTodo,
    togglePersonalTodo,
    deletePersonalTodo,
    addPersonalGoal,
    updatePersonalGoalProgress,
    addMeal,
    addExercise,
    addExpense,
  } = useStore()

  const [newTodo, setNewTodo] = useState('')
  const [newGoal, setNewGoal] = useState({ title: '', description: '', type: 'short-term' as 'short-term' | 'long-term' })
  const [newMeal, setNewMeal] = useState({
    type: 'breakfast' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  })
  const [newExercise, setNewExercise] = useState({
    type: '',
    duration: 30,
    notes: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  })
  const [newExpense, setNewExpense] = useState({
    category: 'food',
    amount: 0,
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  })
  const [gratitude, setGratitude] = useState(['', '', ''])

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addPersonalTodo({
        text: newTodo,
        completed: false,
        date: format(new Date(), 'yyyy-MM-dd'),
      })
      setNewTodo('')
    }
  }

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      addPersonalGoal({
        ...newGoal,
        progress: 0,
      })
      setNewGoal({ title: '', description: '', type: 'short-term' })
    }
  }

  const handleAddMeal = () => {
    if (newMeal.description.trim()) {
      addMeal(newMeal)
      setNewMeal({
        type: 'breakfast',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      })
    }
  }

  const handleAddExercise = () => {
    if (newExercise.type.trim()) {
      addExercise(newExercise)
      setNewExercise({
        type: '',
        duration: 30,
        notes: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      })
    }
  }

  const handleAddExpense = () => {
    if (newExpense.amount > 0) {
      addExpense(newExpense)
      setNewExpense({
        category: 'food',
        amount: 0,
        description: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      })
    }
  }

  const todaysTodos = personalTodos.filter(todo => todo.date === format(new Date(), 'yyyy-MM-dd'))
  const todaysMeals = meals.filter(meal => meal.date === format(new Date(), 'yyyy-MM-dd'))
  const todaysExercises = exercises.filter(ex => ex.date === format(new Date(), 'yyyy-MM-dd'))
  const thisMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date)
    const now = new Date()
    return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear()
  })
  const totalExpenses = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="space-y-6">
      {/* Personal Todos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="text-cozy-sage" size={24} />
            <h3 className="subsection-header mb-0">Personal Tasks</h3>
          </div>

          <div className="space-y-3 mb-4">
            {todaysTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-cozy-cream/50"
              >
                <button
                  onClick={() => togglePersonalTodo(todo.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-cozy-sage" size={20} />
                  ) : (
                    <Circle className="text-cozy-warmGray" size={20} />
                  )}
                </button>
                <span className={`flex-1 ${todo.completed ? 'line-through text-cozy-warmGray' : 'text-cozy-darkBrown'}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deletePersonalTodo(todo.id)}
                  className="flex-shrink-0 text-cozy-warmGray hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder="Add a personal task..."
              className="cozy-input flex-1"
            />
            <button onClick={handleAddTodo} className="cozy-button-secondary">
              <Plus size={20} />
            </button>
          </div>
        </motion.div>

        {/* Meal Planning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="text-cozy-sage" size={24} />
            <h3 className="subsection-header mb-0">Meal Planning</h3>
          </div>

          <div className="space-y-3 mb-4">
            {todaysMeals.map((meal) => (
              <div key={meal.id} className="p-3 rounded-lg bg-cozy-peach/20">
                <span className="text-xs px-2 py-1 rounded-full bg-cozy-terracotta/20 text-cozy-brown capitalize">
                  {meal.type}
                </span>
                <p className="text-cozy-darkBrown mt-2">{meal.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <select
              value={newMeal.type}
              onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value as any })}
              className="cozy-input"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            <input
              type="text"
              value={newMeal.description}
              onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
              placeholder="What are you eating?"
              className="cozy-input"
            />
            <button onClick={handleAddMeal} className="cozy-button-secondary w-full">
              <Plus size={20} className="inline mr-2" />
              Add Meal
            </button>
          </div>
        </motion.div>
      </section>

      {/* Fitness & Expenses */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fitness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="text-cozy-sage" size={24} />
            <h3 className="subsection-header mb-0">Fitness & Exercise</h3>
          </div>

          <div className="space-y-3 mb-4">
            {todaysExercises.map((exercise) => (
              <div key={exercise.id} className="p-3 rounded-lg bg-cozy-sage/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-cozy-darkBrown">{exercise.type}</span>
                  <span className="text-sm text-cozy-brown">{exercise.duration} min</span>
                </div>
                {exercise.notes && (
                  <p className="text-sm text-cozy-warmGray">{exercise.notes}</p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={newExercise.type}
              onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value })}
              placeholder="Exercise type (e.g., Running, Yoga)"
              className="cozy-input"
            />
            <input
              type="number"
              value={newExercise.duration}
              onChange={(e) => setNewExercise({ ...newExercise, duration: parseInt(e.target.value) })}
              placeholder="Duration (minutes)"
              className="cozy-input"
            />
            <input
              type="text"
              value={newExercise.notes}
              onChange={(e) => setNewExercise({ ...newExercise, notes: e.target.value })}
              placeholder="Notes (optional)"
              className="cozy-input"
            />
            <button onClick={handleAddExercise} className="cozy-button-secondary w-full">
              <Plus size={20} className="inline mr-2" />
              Log Exercise
            </button>
          </div>
        </motion.div>

        {/* Budget Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="text-cozy-sage" size={24} />
            <h3 className="subsection-header mb-0">Budget Tracker</h3>
          </div>

          <div className="mb-4 p-4 rounded-lg bg-cozy-sage/10">
            <div className="text-center">
              <p className="text-sm text-cozy-brown mb-1">This Month's Expenses</p>
              <p className="text-3xl font-bold text-cozy-darkBrown">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {thisMonthExpenses.slice(-5).reverse().map((expense) => (
              <div key={expense.id} className="p-2 rounded-lg bg-cozy-cream/50 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-cozy-darkBrown">{expense.description}</p>
                  <p className="text-xs text-cozy-warmGray capitalize">{expense.category}</p>
                </div>
                <span className="font-semibold text-cozy-brown">${expense.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="cozy-input"
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              step="0.01"
              value={newExpense.amount || ''}
              onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
              placeholder="Amount"
              className="cozy-input"
            />
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              placeholder="Description"
              className="cozy-input"
            />
            <button onClick={handleAddExpense} className="cozy-button-secondary w-full">
              <Plus size={20} className="inline mr-2" />
              Add Expense
            </button>
          </div>
        </motion.div>
      </section>

      {/* Personal Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="cozy-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-cozy-sage" size={24} />
          <h3 className="subsection-header mb-0">Personal Goals</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {personalGoals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-lg bg-cozy-cream/50 border border-cozy-sand/50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-cozy-darkBrown">{goal.title}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-cozy-sage/20 text-cozy-brown">
                    {goal.type}
                  </span>
                </div>
              </div>
              <p className="text-sm text-cozy-warmGray mb-3">{goal.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cozy-brown">Progress</span>
                  <span className="font-medium text-cozy-darkBrown">{goal.progress}%</span>
                </div>
                <div className="w-full bg-cozy-sand/30 rounded-full h-2">
                  <div
                    className="bg-cozy-sage h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updatePersonalGoalProgress(goal.id, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 p-4 bg-cozy-cream/30 rounded-lg">
          <h4 className="font-medium text-cozy-brown">Add New Goal</h4>
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Goal title..."
            className="cozy-input"
          />
          <textarea
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            placeholder="Description..."
            className="cozy-input resize-none"
            rows={2}
          />
          <select
            value={newGoal.type}
            onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as 'short-term' | 'long-term' })}
            className="cozy-input"
          >
            <option value="short-term">Short-term</option>
            <option value="long-term">Long-term</option>
          </select>
          <button onClick={handleAddGoal} className="cozy-button-secondary w-full">
            <Plus size={20} className="inline mr-2" />
            Add Goal
          </button>
        </div>
      </motion.div>

      {/* Gratitude & Reflection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="cozy-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="text-cozy-sage" size={24} />
          <h3 className="subsection-header mb-0">Gratitude Journal</h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-cozy-warmGray mb-3">What are you grateful for today?</p>
          {gratitude.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-cozy-terracotta font-medium">{index + 1}.</span>
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newGratitude = [...gratitude]
                  newGratitude[index] = e.target.value
                  setGratitude(newGratitude)
                }}
                placeholder={`Gratitude ${index + 1}...`}
                className="cozy-input"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-cozy-peach/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Smile className="text-cozy-brown" size={20} />
            <h4 className="font-medium text-cozy-brown">How are you feeling?</h4>
          </div>
          <div className="flex gap-2 justify-center">
            {['😢', '😕', '😐', '🙂', '😊'].map((emoji, index) => (
              <button
                key={index}
                className="text-4xl hover:scale-110 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PersonalPlanner
