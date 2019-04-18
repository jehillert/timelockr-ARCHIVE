import * as Debug from 'debug';
import chalk from 'chalk';
import { QueryFile } from 'pg-promise';
import { join } from 'path';

const debug = Debug(chalk.hex('#8ecfe3').bgHex('#08134A')('client:components:main-menu'));

function sql(file) {
  const fullPath = join(__dirname, file);

  const options = {
    minify: true,
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    debug(qf.error);
  }

  return qf;
}

export const users = {
  add: sql('entries/add.sql'),
  auth: sql('entries/auth.sql'),
  delete: sql('entries/delete.sql'),
  update: sql('entries/update.sql'),
};

export const entries = {
  add: sql('users/add.sql'),
  delete: sql('users/delete.sql'),
  deleteAll: sql('users/deleteAll.sql'),
  extends: sql('users/extends.sql'),
  get: sql('users/get.sql'),
};
