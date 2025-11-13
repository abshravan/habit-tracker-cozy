import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Target,
  Users,
  AlertCircle,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { format } from 'date-fns'

const WorkPlanner = () => {
  const {
    workTodos,
    workGoals,
    meetings,
    timeBlocks,
    addWorkTodo,
    toggleWorkTodo,
    deleteWorkTodo,
    addWorkGoal,
    updateWorkGoalProgress,
    addMeeting,
    addTimeBlock,
  } = useStore()

  const [newTodo, setNewTodo] = useState('')
  const [newTodoPriority, setNewTodoPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [newGoal, setNewGoal] = useState({ title: '', description: '', type: 'short-term' as 'short-term' | 'long-term' })
  const [newMeeting, setNewMeeting] = useState({ title: '', date: format(new Date(), 'yyyy-MM-dd'), time: '', notes: '' })
  const [newTimeBlock, setNewTimeBlock] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
  })

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addWorkTodo({
        text: newTodo,
        completed: false,
        priority: newTodoPriority,
        date: format(new Date(), 'yyyy-MM-dd'),
      })
      setNewTodo('')
    }
  }

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      addWorkGoal({
        ...newGoal,
        progress: 0,
      })
      setNewGoal({ title: '', description: '', type: 'short-term' })
    }
  }

  const handleAddMeeting = () => {
    if (newMeeting.title.trim() && newMeeting.time) {
      addMeeting(newMeeting)
      setNewMeeting({ title: '', date: format(new Date(), 'yyyy-MM-dd'), time: '', notes: '' })
    }
  }

  const handleAddTimeBlock = () => {
    if (newTimeBlock.title.trim() && newTimeBlock.startTime && newTimeBlock.endTime) {
      addTimeBlock(newTimeBlock)
      setNewTimeBlock({ title: '', date: format(new Date(), 'yyyy-MM-dd'), startTime: '', endTime: '' })
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-400'
      case 'medium':
        return 'border-l-4 border-yellow-400'
      case 'low':
        return 'border-l-4 border-green-400'
      default:
        return ''
    }
  }

  const todaysTodos = workTodos.filter(todo => todo.date === format(new Date(), 'yyyy-MM-dd'))
  const highPriorityTodos = workTodos.filter(todo => todo.priority === 'high' && !todo.completed)
  const todaysMeetings = meetings.filter(meeting => meeting.date === format(new Date(), 'yyyy-MM-dd'))

  return (
    <div className="space-y-6">
      {/* Daily Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="text-cozy-terracotta" size={24} />
            <h3 className="subsection-header mb-0">Today's Tasks</h3>
          </div>

          <div className="space-y-3 mb-4">
            {todaysTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-3 p-3 rounded-lg bg-cozy-cream/50 ${getPriorityColor(todo.priority)}`}
              >
                <button
                  onClick={() => toggleWorkTodo(todo.id)}
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
                  onClick={() => deleteWorkTodo(todo.id)}
                  className="flex-shrink-0 text-cozy-warmGray hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <select
              value={newTodoPriority}
              onChange={(e) => setNewTodoPriority(e.target.value as 'high' | 'medium' | 'low')}
              className="px-3 py-2 rounded-xl border border-cozy-sand focus:outline-none focus:ring-2 focus:ring-cozy-terracotta/30"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder="Add a new task..."
              className="cozy-input flex-1"
            />
            <button onClick={handleAddTodo} className="cozy-button-primary">
              <Plus size={20} />
            </button>
          </div>
        </motion.div>

        {/* Priority Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-cozy-terracotta" size={24} />
            <h3 className="subsection-header mb-0">High Priority</h3>
          </div>

          <div className="space-y-2">
            {highPriorityTodos.length === 0 ? (
              <p className="text-cozy-warmGray text-sm">No high priority tasks</p>
            ) : (
              highPriorityTodos.map((todo) => (
                <div key={todo.id} className="p-3 rounded-lg bg-red-50 border-l-4 border-red-400">
                  <p className="text-cozy-darkBrown font-medium">{todo.text}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </section>

      {/* Meetings & Time Blocks */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-cozy-terracotta" size={24} />
            <h3 className="subsection-header mb-0">Meetings & Appointments</h3>
          </div>

          <div className="space-y-3 mb-4">
            {todaysMeetings.map((meeting) => (
              <div key={meeting.id} className="p-3 rounded-lg bg-cozy-peach/30">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} className="text-cozy-brown" />
                  <span className="font-medium text-cozy-darkBrown">{meeting.time}</span>
                </div>
                <p className="text-cozy-darkBrown font-medium">{meeting.title}</p>
                {meeting.notes && <p className="text-sm text-cozy-warmGray mt-1">{meeting.notes}</p>}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              placeholder="Meeting title..."
              className="cozy-input"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                className="cozy-input"
              />
              <input
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                className="cozy-input"
              />
            </div>
            <button onClick={handleAddMeeting} className="cozy-button-primary w-full">
              <Plus size={20} className="inline mr-2" />
              Add Meeting
            </button>
          </div>
        </motion.div>

        {/* Time Blocking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="cozy-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-cozy-terracotta" size={24} />
            <h3 className="subsection-header mb-0">Time Blocks</h3>
          </div>

          <div className="space-y-3 mb-4">
            {timeBlocks
              .filter(block => block.date === format(new Date(), 'yyyy-MM-dd'))
              .map((block) => (
                <div key={block.id} className="p-3 rounded-lg bg-cozy-sage/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} className="text-cozy-brown" />
                    <span className="text-sm text-cozy-brown">
                      {block.startTime} - {block.endTime}
                    </span>
                  </div>
                  <p className="text-cozy-darkBrown font-medium">{block.title}</p>
                </div>
              ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={newTimeBlock.title}
              onChange={(e) => setNewTimeBlock({ ...newTimeBlock, title: e.target.value })}
              placeholder="Task/Project name..."
              className="cozy-input"
            />
            <div className="flex gap-2">
              <input
                type="time"
                value={newTimeBlock.startTime}
                onChange={(e) => setNewTimeBlock({ ...newTimeBlock, startTime: e.target.value })}
                className="cozy-input"
              />
              <input
                type="time"
                value={newTimeBlock.endTime}
                onChange={(e) => setNewTimeBlock({ ...newTimeBlock, endTime: e.target.value })}
                className="cozy-input"
              />
            </div>
            <button onClick={handleAddTimeBlock} className="cozy-button-primary w-full">
              <Plus size={20} className="inline mr-2" />
              Add Time Block
            </button>
          </div>
        </motion.div>
      </section>

      {/* Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="cozy-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-cozy-terracotta" size={24} />
          <h3 className="subsection-header mb-0">Goals</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {workGoals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-lg bg-cozy-cream/50 border border-cozy-sand/50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-cozy-darkBrown">{goal.title}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-cozy-terracotta/20 text-cozy-brown">
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
                    className="bg-cozy-terracotta h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateWorkGoalProgress(goal.id, parseInt(e.target.value))}
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
          <button onClick={handleAddGoal} className="cozy-button-primary w-full">
            <Plus size={20} className="inline mr-2" />
            Add Goal
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default WorkPlanner
