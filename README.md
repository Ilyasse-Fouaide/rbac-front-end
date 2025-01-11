# React + Vite

## To do

- [ ] add user
- [ ] delete single user
- [ ] show user

## Advanced Folder Structure for React app

```
src/
├── assets/                        # Images, styles, icons, etc.
│   ├── logo.png                   # App logo
│   ├── avatar-placeholder.png     # Default avatar image
│   └── styles/                    # Global styles
│       └── global.css
├── components/                    # Reusable UI components
│   ├── Button.js                  # Reusable button
│   ├── Input.js                   # Reusable input field
│   ├── Modal.js                   # Modal component
│   ├── Sidebar.js                 # Sidebar component
│   └── Loader.js                  # Loading spinner
├── features/                      # Feature-specific components and logic
│   ├── auth/                      # Authentication-related components
│   │   ├── components/            # Authentication UI components
│   │   │   ├── LoginForm.js       # Login form component
│   │   │   ├── RegisterForm.js    # Register form component
│   │   │   └── PasswordResetForm.js # Password reset form component
│   │   ├── api/                   # API calls related to authentication
│   │   │   └── authApi.js         # Functions for login, registration, etc.
│   │   ├── hooks/                 # Custom hooks for authentication
│   │   │   └── useAuth.js         # Custom hook to manage auth logic
│   │   └── context.js             # Context for global authentication state
│   │
│   ├── dashboard/                 # Dashboard-related components
│   │   ├── components/            # Dashboard UI components
│   │   │   ├── TaskCard.js        # Task summary card
│   │   │   ├── ProjectList.js     # List of projects
│   │   │   └── ActivityFeed.js    # Recent activity feed
│   │   ├── services/              # API services for dashboard features
│   │   │   └── projectApi.js      # API calls for projects and tasks
│   │   ├── context.js             # Context for dashboard data (e.g., projects)
│   │   └── hooks/                 # Custom hooks for dashboard
│   │       └── useDashboard.js    # Hook for managing dashboard state
│   │
│   ├── notifications/             # Notifications feature
│   │   ├── components/            # Notification UI components
│   │   │   ├── NotificationItem.js # Single notification component
│   │   │   └── NotificationList.js # List of notifications
│   │   ├── api/                   # API calls for fetching notifications
│   │   │   └── notificationApi.js # Fetch notifications from backend
│   │   └── hooks/                 # Custom hooks for notifications
│   │       └── useNotifications.js # Hook to manage notifications state
├── hooks/                         # Reusable custom hooks
│   ├── useFetch.js                # Generic fetch hook for API calls
│   └── useLocalStorage.js         # Custom hook for localStorage management
├── pages/                         # Page-level components
│   ├── Login.jsx                  # Login page
│   ├── Dashboard.jsx              # Dashboard page
│   ├── ProjectPage.jsx            # Page for viewing a single project
│   ├── Settings.jsx               # User settings page
│   ├── NotFound.jsx               # 404 page
│   └── Register.jsx               # Registration page
├── layout/                        # Global layout components
│   ├── Header.js                  # Header with navigation
│   ├── Sidebar.js                 # Sidebar with project navigation
│   └── Footer.js                  # Footer component
├── context/                       # Centralized global state
│   ├── ThemeContext.js            # Theme management (e.g., light/dark mode)
│   └── LanguageContext.js         # Language management (e.g., EN/FR)
├── utils/                         # Utility functions and helpers
│   ├── dateUtils.js               # Date formatting utilities
│   ├── stringUtils.js             # String manipulation helpers
│   └── validationUtils.js         # Validation functions (e.g., email format)
├── api/                           # Global API services
│   ├── taskApi.js                 # API for tasks (create, update, delete)
│   ├── userApi.js                 # API for user data (profile, settings)
│   └── projectApi.js              # API for managing projects
├── App.js                         # Main App component, routing, and top-level layout
├── index.js                       # Application entry point
└── package.json                   # Project metadata and dependencies

```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## What i learn

- Token Refresh with Axios Interceptors [click](https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde)
