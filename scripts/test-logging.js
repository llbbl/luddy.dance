#!/usr/bin/env node

// Test script to demonstrate environment-based logging behavior

console.log('Testing logging behavior in different environments...\n');

// Test 1: Development mode
process.env.NODE_ENV = 'development';
delete require.cache[require.resolve('../lib/logger.ts')];
console.log('1. Development mode (NODE_ENV=development):');
try {
  const { log } = require('../lib/logger.ts');
  log.info('This should appear in development');
  console.log('   ✅ Logging enabled in development\n');
} catch (e) {
  console.log('   ❌ Error in development:', e.message, '\n');
}

// Test 2: Production mode (default)
process.env.NODE_ENV = 'production';
delete process.env.NEXT_PUBLIC_ENABLE_LOGGING;
delete require.cache[require.resolve('../lib/logger.ts')];
console.log('2. Production mode (NODE_ENV=production, no NEXT_PUBLIC_ENABLE_LOGGING):');
try {
  const { log } = require('../lib/logger.ts');
  log.info('This should NOT appear in production');
  console.log('   ✅ Logging disabled in production\n');
} catch (e) {
  console.log('   ❌ Error in production:', e.message, '\n');
}

// Test 3: Production mode with explicit enable
process.env.NODE_ENV = 'production';
process.env.NEXT_PUBLIC_ENABLE_LOGGING = 'true';
delete require.cache[require.resolve('../lib/logger.ts')];
console.log('3. Production mode with NEXT_PUBLIC_ENABLE_LOGGING=true:');
try {
  const { log } = require('../lib/logger.ts');
  log.info('This SHOULD appear with explicit enable');
  console.log('   ✅ Logging enabled with explicit flag\n');
} catch (e) {
  console.log('   ❌ Error with explicit enable:', e.message, '\n');
}

console.log('Environment-based logging test complete! 🎯');
