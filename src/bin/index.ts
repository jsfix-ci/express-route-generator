#!/usr/bin/env node

import { Command } from 'commander';
import { AddOptions, ListOptions, RemoveOptions } from '../common/types';
import { AddCommand, ListCommand, RemoveCommand } from './commands';

const { name, description, version } = require('../../package.json');
const program = new Command(name);

program.description(description);
program.version(version, '-v, --version');

program
  .command('add <name>')
  .alias('a')
  .description('adds a new route', {
    name: 'name of the new route',
  })
  .option('-p, --path <path>', "path of the 'routes' folder")
  .option('-s, --schemes <path>', "path of the 'schemes' folder")
  .option('-m, --methods <methods...>', 'accepted methods')
  .option('--typescript', 'generates the files with .ts extension', false)
  .option('--no-test', 'prevents generation of test file')
  .action((name, options: AddOptions, _: Command) => {
    try {
      const command = new AddCommand(name, options);
      command.run();
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .command('remove <name>')
  .alias('rm')
  .description('removes a route by name', {
    name: 'name of the route to be removed',
  })
  .option('-p, --path <path>', "path of the 'routes' folder")
  .option('-t, --test', 'removes test file only')
  .action((name, options: RemoveOptions, _: Command) => {
    try {
      const command = new RemoveCommand(name, options);
      command.run();
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .command('list')
  .alias('ls')
  .description('lists all routes')
  .option('-p, --path <path>', "path of the 'routes' folder")
  .option('-r, --recursive', 'recursively prints folders and files')
  .action((options: ListOptions, _: Command) => {
    try {
      const command = new ListCommand(options);
      command.run();
    } catch (err) {
      console.log(err.message);
    }
  });

program.parse();