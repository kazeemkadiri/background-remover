const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  globalTeardown: './backend/src/tests/teardown.ts',
  transform: {
    ...tsJestTransformCfg,
  },
};