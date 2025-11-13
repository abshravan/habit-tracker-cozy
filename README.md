# Cozy Habit Tracker 🌿

A beautiful, cozy, and aesthetic desktop app for tracking habits, managing work tasks, and organizing your personal life.

![Cozy Habit Tracker](https://img.shields.io/badge/status-active-success.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## Features ✨

### 1. Work Planner Section 💼

- **Daily/Weekly Overview**: Organize your work tasks by date and time
- **Todo List**: Task management with priority levels (High/Medium/Low)
- **Priority Tasks**: Dedicated view for high-priority items
- **Meetings & Appointments**: Schedule and track all your meetings with notes
- **Time Blocking**: Plan your day with time blocks for focused work
- **Goal Setting**: Track short-term and long-term career goals with progress indicators
- **Reflection**: End-of-day review space for achievements, challenges, and improvements

### 2. Personal Planner Section 🏡

- **Personal Todo List**: Manage personal errands and tasks
- **Meal Planning**: Track your daily meals (breakfast, lunch, dinner, snacks)
- **Fitness Tracker**: Log exercises with duration and notes
- **Budget Tracker**: Monitor expenses by category with monthly totals
- **Personal Goals**: Set and track personal growth goals
- **Gratitude Journal**: Daily gratitude practice with mood tracking
- **Self-care**: Dedicated space for wellness activities

### 3. Habit Tracker Section 🎯

- **Habit Creation**: Create habits with categories and frequency settings
- **Daily Tracking**: 7-day view with easy checkbox completion
- **Streak Counter**: Track consecutive days with flame icon indicators
- **Progress Visualization**: 30-day completion rate for each habit
- **Monthly Calendar**: Heat map showing activity levels throughout the month
- **Category Breakdown**: Organize habits by Health, Productivity, Mental Wellbeing, etc.
- **Motivational Quotes**: Stay inspired with encouraging messages

## Design Philosophy 🎨

The app features a warm, cozy aesthetic with:

- **Color Palette**: Cream (#FFF8F0), Peach (#FFE5D9), Sage (#B8C5B3), Terracotta (#D4A59A)
- **Typography**: Inter for body text, Playfair Display for headings
- **Smooth Animations**: Gentle transitions powered by Framer Motion
- **Responsive Layout**: Works beautifully at any window size

## Tech Stack 🛠️

- **Electron**: Cross-platform desktop application
- **React**: Component-based UI
- **TypeScript**: Type-safe development
- **Zustand**: Lightweight state management with persistence
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Lucide Icons**: Beautiful, consistent icons
- **date-fns**: Date manipulation and formatting

## Installation & Setup 📦

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd habit-tracker-cozy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Development Scripts

- `npm run dev` - Start the development server (React + Electron)
- `npm run dev:react` - Start only the React dev server
- `npm run dev:electron` - Start only Electron (requires React server running)
- `npm run build` - Build the app for production
- `npm run build:react` - Build only the React app
- `npm run type-check` - Run TypeScript type checking

## Project Structure 📁

```
habit-tracker-cozy/
├── electron/               # Electron main process
│   └── main.js
├── src/
│   ├── components/        # React components
│   │   ├── WorkPlanner.tsx
│   │   ├── PersonalPlanner.tsx
│   │   └── HabitTracker.tsx
│   ├── store/            # Zustand store
│   │   └── useStore.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Data Persistence 💾

All your data is automatically saved to browser's localStorage and persists between sessions:

- Work todos, goals, meetings, and time blocks
- Personal todos, meals, exercises, and expenses
- All habits with completion dates and streaks
- Reflections and notes

## Usage Tips 💡

1. **Start with Habits**: Create 3-5 core habits you want to build
2. **Use Priority Levels**: Mark urgent work tasks as "High" priority
3. **Time Blocking**: Schedule focused work sessions for better productivity
4. **Daily Reflection**: End each day by reviewing achievements and challenges
5. **Track Streaks**: Keep your habit streaks alive for motivation!

## Keyboard Shortcuts ⌨️

- **Enter**: Submit forms (add todos, habits, etc.)
- **Esc**: Close modals and dialogs

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments 🙏

- Design inspired by cozy, minimalist productivity apps
- Color palette inspired by warm, natural tones
- Icons from Lucide Icons
- Fonts from Google Fonts

---

Built with ❤️ for productivity and peace of mind
