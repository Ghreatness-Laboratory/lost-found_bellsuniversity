module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Suitable for testing React components
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files using Babel
  },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'), // Resolve axios to its CommonJS version
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // Ensure Jest transforms specific ESM modules
  ],
};
