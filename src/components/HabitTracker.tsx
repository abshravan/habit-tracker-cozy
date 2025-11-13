import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Trash2,
  Flame,
  TrendingUp,
  Calendar,
  Target,
  Activity,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

const HABIT_COLORS = [
  '#D4A59A', // terracotta
  '#B8C5B3', // sage
  '#8B6F47', // brown
  '#FFE5D9', // peach
  '#E8DCC4', // sand
  '#FF9B85', // coral
  '#A8DADC', // powder blue
  '#E5C3D1', // dusty rose
]

const CATEGORIES = [
  'Health',
  'Productivity',
  'Mental Wellbeing',
  'Personal Growth',
  'Social',
  'Creativity',
  'Fitness',
  'Learning',
]

const HabitTracker = () => {
  const { habits, addHabit, toggleHabitCompletion, deleteHabit } = useStore()

  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Health',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
    color: HABIT_COLORS[0],
  })

  const handleAddHabit = () => {
    if (newHabit.name.trim()) {
      addHabit(newHabit)
      setNewHabit({
        name: '',
        category: 'Health',
        frequency: 'daily',
        color: HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)],
      })
    }
  }

  const today = format(new Date(), 'yyyy-MM-dd')
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    return format(date, 'yyyy-MM-dd')
  })

  const thisMonthDays = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  })

  const getCompletionRate = (habit: typeof habits[0]) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), i)
      return format(date, 'yyyy-MM-dd')
    })

    const completed = last30Days.filter(date => habit.completedDates.includes(date)).length
    return Math.round((completed / 30) * 100)
  }

  const getCategoryStats = () => {
    const stats: Record<string, number> = {}
    habits.forEach(habit => {
      stats[habit.category] = (stats[habit.category] || 0) + 1
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cozy-card bg-gradient-to-br from-cozy-terracotta/10 to-cozy-peach/10"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cozy-terracotta/20 rounded-xl">
              <Target className="text-cozy-terracotta" size={24} />
            </div>
            <div>
              <p className="text-sm text-cozy-warmGray">Total Habits</p>
              <p className="text-3xl font-bold text-cozy-darkBrown">{habits.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cozy-card bg-gradient-to-br from-cozy-sage/10 to-cozy-sage/5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cozy-sage/20 rounded-xl">
              <Flame className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-cozy-warmGray">Longest Streak</p>
              <p className="text-3xl font-bold text-cozy-darkBrown">
                {Math.max(...habits.map(h => h.streak), 0)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cozy-card bg-gradient-to-br from-cozy-brown/10 to-cozy-sand/10"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cozy-brown/20 rounded-xl">
              <Activity className="text-cozy-brown" size={24} />
            </div>
            <div>
              <p className="text-sm text-cozy-warmGray">Completed Today</p>
              <p className="text-3xl font-bold text-cozy-darkBrown">
                {habits.filter(h => h.completedDates.includes(today)).length}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Add New Habit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="cozy-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Plus className="text-cozy-terracotta" size={24} />
          <h3 className="subsection-header mb-0">Create New Habit</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            placeholder="Habit name..."
            className="cozy-input"
          />
          <select
            value={newHabit.category}
            onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
            className="cozy-input"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={newHabit.frequency}
            onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value as any })}
            className="cozy-input"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={handleAddHabit} className="cozy-button-primary">
            <Plus size={20} className="inline mr-2" />
            Add Habit
          </button>
        </div>
      </motion.div>

      {/* Daily Habit Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="cozy-card"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="text-cozy-terracotta" size={24} />
          <h3 className="subsection-header mb-0">Daily Tracker - Last 7 Days</h3>
        </div>

        {habits.length === 0 ? (
          <div className="text-center py-8">
            <Target className="mx-auto text-cozy-warmGray mb-3" size={48} />
            <p className="text-cozy-warmGray">No habits yet. Create your first habit above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cozy-sand">
                  <th className="text-left py-3 px-4 font-medium text-cozy-brown">Habit</th>
                  <th className="text-center py-3 px-2 font-medium text-cozy-brown">
                    <Flame size={16} className="inline" />
                  </th>
                  {last7Days.map(date => (
                    <th key={date} className="text-center py-3 px-2 font-medium text-cozy-brown text-xs">
                      {format(new Date(date), 'EEE')}
                      <br />
                      {format(new Date(date), 'dd')}
                    </th>
                  ))}
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit, index) => (
                  <motion.tr
                    key={habit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-cozy-sand/30 hover:bg-cozy-cream/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: habit.color }}
                        />
                        <div>
                          <p className="font-medium text-cozy-darkBrown">{habit.name}</p>
                          <p className="text-xs text-cozy-warmGray">{habit.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <Flame size={16} className="text-orange-500" />
                        <span className="font-bold text-cozy-darkBrown">{habit.streak}</span>
                      </div>
                    </td>
                    {last7Days.map(date => {
                      const isCompleted = habit.completedDates.includes(date)
                      return (
                        <td key={date} className="text-center py-4 px-2">
                          <button
                            onClick={() => toggleHabitCompletion(habit.id, date)}
                            className="w-8 h-8 rounded-lg transition-all hover:scale-110"
                            style={{
                              backgroundColor: isCompleted ? habit.color : 'transparent',
                              border: `2px solid ${habit.color}`,
                              opacity: isCompleted ? 1 : 0.3,
                            }}
                          >
                            {isCompleted && (
                              <span className="text-white text-lg">✓</span>
                            )}
                          </button>
                        </td>
                      )
                    })}
                    <td className="py-4 px-2">
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-cozy-warmGray hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Habit Progress & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-cozy-terracotta" size={24} />
            <h3 className="subsection-header mb-0">30-Day Progress</h3>
          </div>

          <div className="space-y-4">
            {habits.map(habit => {
              const completionRate = getCompletionRate(habit)
              return (
                <div key={habit.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: habit.color }}
                      />
                      <span className="text-sm font-medium text-cozy-darkBrown">
                        {habit.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-cozy-brown">
                      {completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-cozy-sand/30 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${completionRate}%`,
                        backgroundColor: habit.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-cozy-terracotta" size={24} />
            <h3 className="subsection-header mb-0">Categories</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-cozy-cream/50">
                <span className="font-medium text-cozy-darkBrown">{category}</span>
                <span className="px-3 py-1 rounded-full bg-cozy-terracotta/20 text-cozy-brown font-semibold">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {Object.keys(categoryStats).length === 0 && (
            <p className="text-center text-cozy-warmGray py-8">
              No categories yet
            </p>
          )}
        </motion.div>
      </section>

      {/* Monthly Calendar View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="cozy-card"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="text-cozy-terracotta" size={24} />
          <h3 className="subsection-header mb-0">
            {format(new Date(), 'MMMM yyyy')} Overview
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-cozy-brown py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: thisMonthDays[0].getDay() }, (_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {thisMonthDays.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const completedHabits = habits.filter(h => h.completedDates.includes(dateStr)).length
            const totalHabits = habits.length
            const completionPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0

            const isToday = dateStr === today

            return (
              <div
                key={dateStr}
                className={`aspect-square rounded-lg p-2 flex flex-col items-center justify-center transition-all ${
                  isToday ? 'ring-2 ring-cozy-terracotta' : ''
                }`}
                style={{
                  backgroundColor: completionPercentage > 0
                    ? `rgba(212, 165, 154, ${completionPercentage / 100})`
                    : 'transparent',
                }}
              >
                <span className={`text-xs font-medium ${
                  completionPercentage > 50 ? 'text-white' : 'text-cozy-darkBrown'
                }`}>
                  {format(day, 'd')}
                </span>
                {completedHabits > 0 && (
                  <span className={`text-xs ${
                    completionPercentage > 50 ? 'text-white' : 'text-cozy-brown'
                  }`}>
                    {completedHabits}/{totalHabits}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-cozy-warmGray">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cozy-terracotta/20" />
            <span>Low activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cozy-terracotta/60" />
            <span>Medium activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cozy-terracotta" />
            <span>High activity</span>
          </div>
        </div>
      </motion.div>

      {/* Motivational Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="cozy-card bg-gradient-to-r from-cozy-peach/20 to-cozy-sage/20"
      >
        <div className="text-center py-6">
          <h3 className="text-2xl font-display font-semibold text-cozy-darkBrown mb-2">
            Keep Going! 🌟
          </h3>
          <p className="text-cozy-brown">
            "Success is the sum of small efforts repeated day in and day out."
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default HabitTracker
