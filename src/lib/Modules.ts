import {Client} from 'eris';
import chalk from 'chalk';
import figlet from 'figlet';
import nedb from 'nedb';
import fileSys from 'fs';
import http from 'http';

let Modules: any = {};

Modules.ENGINE      = Client;
Modules.COLORS      = chalk;
Modules.ASCII       = figlet;
Modules.DATABASE    = nedb;
Modules.FILESYS     = fileSys;
Modules.HTTP        = http;

export = Modules;
