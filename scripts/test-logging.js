#!/usr/bin/env node

// Manual check that env-based log gating behaves as documented.

const CONSOLE_METHODS = ['debug', 'info', 'warn', 'error'];

const cases = [
  { name: 'development', env: { NODE_ENV: 'development' }, expectConsoleOutput: true },
  { name: 'production', env: { NODE_ENV: 'production' }, expectConsoleOutput: false },
  {
    name: 'production + NEXT_PUBLIC_ENABLE_LOGGING=true',
    env: { NODE_ENV: 'production', NEXT_PUBLIC_ENABLE_LOGGING: 'true' },
    expectConsoleOutput: true,
  },
];

async function run() {
  let failures = 0;

  for (const [index, testCase] of cases.entries()) {
    for (const key of ['NODE_ENV', 'NEXT_PUBLIC_ENABLE_LOGGING']) {
      delete process.env[key];
    }
    Object.assign(process.env, testCase.env);

    const captured = [];
    const originals = {};
    for (const method of CONSOLE_METHODS) {
      originals[method] = console[method];
      console[method] = (...args) => captured.push(args);
    }

    let importError;
    try {
      const { log } = await import(`../lib/logger.ts?case=${index}`);
      log.info('probe');
    } catch (error) {
      importError = error;
    } finally {
      for (const method of CONSOLE_METHODS) {
        console[method] = originals[method];
      }
    }

    if (importError) {
      failures += 1;
      console.error(`✗ ${testCase.name}: ${importError.message}`);
      continue;
    }

    const producedOutput = captured.length > 0;
    if (producedOutput === testCase.expectConsoleOutput) {
      console.log(`✓ ${testCase.name}: ${producedOutput ? 'logs to console' : 'silent'}`);
    } else {
      failures += 1;
      const expected = testCase.expectConsoleOutput ? 'console output' : 'silence';
      const actual = producedOutput ? 'console output' : 'silence';
      console.error(`✗ ${testCase.name}: expected ${expected}, got ${actual}`);
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} logging check(s) failed`);
    process.exit(1);
  }
  console.log('\nLogging environment checks passed');
}

run();
