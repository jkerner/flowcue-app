/**
 * Application error types for FlowCue.
 *
 * All custom errors extend AppError so they can be caught uniformly
 * while still carrying a machine-readable `code` for handling logic.
 */

export type ErrorCode =
  | 'DATABASE_ERROR'
  | 'SEED_ERROR'
  | 'AI_SERVICE_ERROR'
  | 'AUDIO_SERVICE_ERROR'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly context?: Record<string, unknown>;

  constructor(
    code: ErrorCode,
    message: string,
    context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('DATABASE_ERROR', message, context);
    this.name = 'DatabaseError';
  }
}

export class SeedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('SEED_ERROR', message, context);
    this.name = 'SeedError';
  }
}

export class AIServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('AI_SERVICE_ERROR', message, context);
    this.name = 'AIServiceError';
  }
}

export class AudioServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('AUDIO_SERVICE_ERROR', message, context);
    this.name = 'AudioServiceError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('NETWORK_ERROR', message, context);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, context);
    this.name = 'ValidationError';
  }
}

/**
 * Type guard to check if an unknown value is an AppError.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Wraps an unknown thrown value into an AppError.
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return new AppError('UNKNOWN_ERROR', error.message);
  }
  return new AppError('UNKNOWN_ERROR', String(error));
}
