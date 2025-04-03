# Advanced Task Manager

![Task Manager Logo](/public/task-manager-icon.svg)

A modern, feature-rich task management application built with React, TypeScript, and Styled Components. This application provides a clean and elegant user interface for managing your daily tasks with advanced features like task filtering, drag-and-drop reordering, and theme switching.

## 📋 Features

### Core Functionality
- ✅ Add new tasks
- ✅ Mark tasks as completed
- ✅ Delete tasks
- ✅ Filter tasks (All, Completed, Pending)
- ✅ Persist tasks using Local Storage
- ✅ **Drag and drop to reorder tasks**

### React Features
- 🔄 Custom Hooks (useLocalStorage)
- 🌐 Context API for state management
- ⚡ Performance Optimization with React.memo, useCallback, and useMemo
- 🛡️ Form Validation to prevent empty tasks

### UI/UX Features
- 🌓 Dark/Light Theme Toggle
- ✨ CSS Animations for adding/removing tasks
- 📱 Responsive Design (Mobile-first approach)
- 🎨 Modern, clean UI
- 🔄 **Task Drag-and-Drop** (using react-beautiful-dnd)
  - Tasks can be reordered by dragging the grip handle on the left side
  - Works even with filtered tasks (completed/pending)
  - Visual feedback during dragging for better UX

## 🛠️ Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Styled Components** - Styling
- **React Beautiful DnD** - Drag and drop functionality
- **Vite** - Build tool and development server

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Ashish5689/advance-task-manager.git
   cd advance-task-manager
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/         # UI components
│   ├── AppIcon.tsx     # App logo component
│   └── TaskManager.tsx # Main task management component
├── context/            # React Context for state management
│   ├── TaskContext.tsx # Task state management
│   └── ThemeContext.tsx # Theme state management
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # Hook for localStorage operations
├── types/              # TypeScript type definitions
│   └── index.ts        # Common types used across the app
├── App.tsx             # Main App component
├── main.tsx            # Entry point
└── style.css           # Global styles
```

## 🔧 Usage

### Task Management
- **Add Task**: Type your task in the input field and click "Add Task"
- **Complete Task**: Click the checkbox next to a task to mark it as completed
- **Delete Task**: Click the "✖" button to delete a task
- **Reorder Tasks**: Drag and drop tasks using the grip handle on the left side of each task

### Filtering
Use the filter buttons to show:
- **All**: All tasks
- **Completed**: Only completed tasks
- **Pending**: Only pending tasks

### Theme Switching
- Click the theme toggle button in the top-right corner to switch between light and dark modes

## 🛠️ Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Your Name - Ashish Jha

Project Link: [https://github.com/Ashish5689/advance-task-manager](https://github.com/Ashish5689/advance-task-manager)

---

Made with ❤️ using React and TypeScript 
