import colors from 'chalk';
import figlet from 'figlet';

class Logger {
    name: string;
    copyright: string;
    year: number;
    colors: any;
    constructor(options?: any) {
        this.name = options.name || 'BuggleAI';
        this.copyright = options.copyright || 'The Buggle Species';
        this.year = new Date().getFullYear();
        this.colors = {
            warning: colors['yellow'],
            error: colors['red'],
            info: colors['white'],
            debug: colors['blue'],
            success: colors['green']
        }
    }
    private postData(type: string, service: string, data: any) {
        let thisService = `[${this.colors[type](service.toUpperCase())}]`;
        console.log(colors['gray'](`${thisService}: ${data}`));
    }
    brand() {
        console.log(colors['green'](figlet.textSync(this.name)));
        console.log(colors['gray'](`(c) ${this.copyright} ${this.year}`));
    }
    warn(service: string, data: any) {
        this.postData('warning', service, data);
    }
    error(service: string, data: any) {
        this.postData('error', service, data);
    }
    success(service: string, data: any) {
        this.postData('success', service, data);
    }
    debug(service: string, data: any) {
        this.postData('debug', service, data);
    }
}

export = Logger;
