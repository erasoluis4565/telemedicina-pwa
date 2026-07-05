module.exports = {
    testEnvironment: "node",

    coverageDirectory: "coverage",

    collectCoverage: true,

    collectCoverageFrom: [
        "src/**/*.js",
        "!src/server.js",
        "!src/app.js",
        "!src/**/*.model.js"
    ],

    testMatch: [
        "**/__tests__/**/*.test.js",
    ],
};