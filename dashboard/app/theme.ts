import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          value: "#2D3648",
        },
        secondary: {
          value: "#EDF0F7",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
