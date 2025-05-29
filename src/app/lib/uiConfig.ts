// src/lib/uiConfig.ts

export const uiTheme = {
  colors: {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100",

    contentBg: "bg-sky-50",
    card: "bg-white shadow-md rounded-2xl p-4",
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
  },
  sidebar: "bg-white shadow-md border-r",
  navActive: "bg-blue-600 text-white",
  navInactive: "text-gray-700 hover:bg-blue-100",
  buttons: {
    card: "bg-white text-gray-800 shadow-sm hover:shadow-md rounded-md px-3 py-1.5",
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100",
    destructive: "bg-red-100 text-red-700 hover:bg-red-200 px-3",
  },

  layout: {
    container: "max-w-6xl mx-auto space-y-6", // shared layout width
    formGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  },
};
