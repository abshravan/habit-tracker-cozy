import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, Target, Menu, X } from 'lucide-react'
import WorkPlanner from './components/WorkPlanner'
import PersonalPlanner from './components/PersonalPlanner'
import HabitTracker from './components/HabitTracker'

type Section = 'work' | 'personal' | 'habits'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('work')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sections = [
    { id: 'work' as Section, name: 'Work Planner', icon: Calendar, color: 'cozy-terracotta' },
    { id: 'personal' as Section, name: 'Personal Planner', icon: User, color: 'cozy-sage' },
    { id: 'habits' as Section, name: 'Habit Tracker', icon: Target, color: 'cozy-brown' },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'work':
        return <WorkPlanner />
      case 'personal':
        return <PersonalPlanner />
      case 'habits':
        return <HabitTracker />
      default:
        return <WorkPlanner />
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-cozy-cream">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-72 bg-white border-r border-cozy-sand/30 flex flex-col shadow-lg"
          >
            {/* Header */}
            <div className="p-6 border-b border-cozy-sand/30">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-display font-bold text-cozy-darkBrown">
                  Cozy Planner
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-cozy-cream rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-cozy-warmGray">Your peaceful productivity companion</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id

                return (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? `bg-${section.color}/10 text-${section.color} border border-${section.color}/20`
                        : 'text-cozy-brown hover:bg-cozy-cream'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{section.name}</span>
                  </motion.button>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-cozy-sand/30">
              <div className="text-xs text-cozy-warmGray text-center">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-cozy-sand/30 px-6 py-4 flex items-center gap-4 shadow-sm">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-cozy-cream rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
          <h2 className="text-2xl font-display font-semibold text-cozy-darkBrown">
            {sections.find(s => s.id === activeSection)?.name}
          </h2>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
