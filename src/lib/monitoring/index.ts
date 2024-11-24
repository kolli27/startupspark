interface LogLevel {
  error: string;
  warn: string;
  info: string;
  debug: string;
}

type LogMethod = (message: string, ...args: any[]) => void;

interface Logger {
  error: LogMethod;
  warn: LogMethod;
  info: LogMethod;
  debug: LogMethod;
}

const LOG_LEVELS: LogLevel = {
  error: 'ERROR',
  warn: 'WARN',
  info: 'INFO',
  debug: 'DEBUG'
};

class MonitoringService implements Logger {
  private formatMessage(level: string, message: string, args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.map(arg => 
      arg instanceof Error ? arg.stack || arg.message : JSON.stringify(arg)
    ).join(' ');
    
    return `[${timestamp}] ${level}: ${message} ${formattedArgs}`.trim();
  }

  error(message: string, ...args: any[]): void {
    console.error(this.formatMessage(LOG_LEVELS.error, message, args));
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage(LOG_LEVELS.warn, message, args));
  }

  info(message: string, ...args: any[]): void {
    console.info(this.formatMessage(LOG_LEVELS.info, message, args));
  }

  debug(message: string, ...args: any[]): void {
    console.debug(this.formatMessage(LOG_LEVELS.debug, message, args));
  }
}

export const logger = new MonitoringService();
