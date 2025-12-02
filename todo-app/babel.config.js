// babel.config.js
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        allowUndefined: false, // Ensures you catch errors if the variable is missing
      },
    ],
  ],
};
