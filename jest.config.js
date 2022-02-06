module.exports = {
  moduleFileExtensions: ["js", "json"],
  testRegex: [".spec.js$", ".test.js$"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  // setupFilesAfterEnv: ["./jest.setup.js"],
  // preset: "@shelf/jest-mongodb", // to avoid conflicting with preset delete testEnvironmet
};
