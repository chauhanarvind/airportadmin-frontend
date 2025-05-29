// src/lib/uiConfig.ts

export const uiTheme = {
  components: {
    select: {
      trigger: "bg-white border border-gray-300 rounded-md px-3 py-2",
      content: "bg-white border border-gray-200 shadow-md rounded-md",
    },
  },
  colors: {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100",

    contentBg: "bg-sky-50",
    card: "bg-white shadow-md rounded-2xl p-4",

    status: {
      success: "text-green-600 bg-green-100",
      warning: "text-yellow-700 bg-yellow-100",
      error: "text-red-700 bg-red-100",
      info: "text-blue-700 bg-blue-100",
    },
  },

  spacing: {
    cardPadding: "p-4",
    pagePadding: "p-6 md:p-10",
  },

  border: {
    rounded: "rounded-2xl",
  },

  text: {
    heading: "text-xl font-semibold",
    subheading: "text-lg text-gray-600",
    label: "text-sm font-medium",
    base: "text-base",
    sm: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
    monospace: "font-mono",
  },

  layout: {
    container: "max-w-6xl mx-auto space-y-6",
    formGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  },

  buttons: {
    // Primary form submit (save/apply)
    submit: "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md",

    // Apply/Create buttons (e.g. to go to /id page)
    action:
      "bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-md border border-blue-300",

    // Back navigation button
    back: "bg-white text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-md shadow-sm",

    // Disabled button style
    disabled:
      "bg-gray-300 text-gray-600 cursor-not-allowed px-4 py-2 rounded-md",

    // Apply filters or search
    search: "bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md",

    // Reset form or filters
    reset: "bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md",

    // Remove an item from field array or inline form
    remove:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1.5 rounded-md",

    // Delete (permanent destructive action)
    delete: "bg-red-600 text-white hover:bg-red-700 px-3 py-1.5 rounded-md",

    // Card-level buttons
    card: "bg-white text-gray-800 shadow-sm hover:shadow-md rounded-md px-3 py-1.5",

    // Outlined style
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100",

    // General destructive but less intense
    destructive: "bg-red-100 text-red-700 hover:bg-red-200 px-3 rounded-md",
  },
  form: {
    input:
      "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
    errorText: "text-sm text-red-500",
    disabled: "bg-gray-100 cursor-not-allowed",
  },

  sidebar: "bg-white shadow-md border-r",

  nav: {
    active: "bg-blue-600 text-white",
    inactive: "text-gray-700 hover:bg-blue-100",
    link: "px-3 py-2 rounded-md",
  },

  sizing: {
    inputHeight: "h-10",
    buttonHeight: "h-9",
    sidebarWidth: "w-64",
  },

  shadows: {
    base: "shadow",
    md: "shadow-md",
    lg: "shadow-lg",
  },

  zIndex: {
    modal: "z-50",
    dropdown: "z-40",
    header: "z-30",
  },
};
