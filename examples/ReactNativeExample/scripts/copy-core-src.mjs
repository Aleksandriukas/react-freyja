#!/usr/bin/env zx
/* eslint-disable */

console.log('Copy src files from @react-freyja/core package...');

fs.copySync(
  path.resolve(__dirname, '..', '..', '..', 'packages', 'core', 'src'),
  path.resolve(__dirname, '..', 'temp'),
);
