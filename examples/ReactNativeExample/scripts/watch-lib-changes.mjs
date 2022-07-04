#!/usr/bin/env zx
/* eslint-disable */

import {watch} from 'chokidar';

const srcPath = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'packages',
  'core',
  'src',
);

const destPath = path.resolve(__dirname, '..', 'temp');

const copyFiles = () => {
  fs.copySync(srcPath, destPath);
};

const watcher = watch(srcPath, {persistent: true});

watcher.on('add', copyFiles).on('change', copyFiles).on('unlink', copyFiles);

copyFiles();

console.log('Watching for updates...');
