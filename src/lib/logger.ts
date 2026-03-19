/**
 * Simple structured logger for FlowCue.
 *
 * Wraps console methods with a consistent prefix and ISO timestamp.
 * In production builds, debug-level output is suppressed.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const PREFIX = '[FlowCue]';

function timestamp(): string {
  return new Date().toISOString();
}

function isDevMode(): boolean {
  return typeof __DEV__ !== 'undefined' && __DEV__;
}

function formatMessage(level: LogLevel, message: string): string {
  return `${PREFIX} ${timestamp()} [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  debug(message: string, ...args: unknown[]): void {
    if (isDevMode()) {
      console.log(formatMessage('debug', message), ...args);
    }
  },

  info(message: string, ...args: unknown[]): void {
    console.log(formatMessage('info', message), ...args);
  },

  warn(message: string, ...args: unknown[]): void {
    console.warn(formatMessage('warn', message), ...args);
  },

  error(message: string, ...args: unknown[]): void {
    console.error(formatMessage('error', message), ...args);
  },
};
