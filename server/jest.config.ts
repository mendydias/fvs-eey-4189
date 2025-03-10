/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  // Most configuration settings kept the same...
  preset: "ts-jest",
  testEnvironment: "node",

  // Fixed moduleNameMapper to handle ESM imports properly
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // This mapping helps with ESM imports
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  // Properly format transformIgnorePatterns to handle jose
  transformIgnorePatterns: ["/node_modules/(?!(jose|@panva)/)"],

  // Simplified transform configuration to avoid conflicts
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },

  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testTimeout: 10000,
};

export default config;
