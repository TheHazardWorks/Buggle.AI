import {Client} from 'eris';
import chalk from 'chalk';
import figlet from 'figlet';
import nedb from 'nedb';

let Modules: any = {};

Modules.ENGINE      = Client;
Modules.COLORS      = chalk;
Modules.ASCII       = figlet;
Modules.DATABASE    = nedb;

export = Modules;
