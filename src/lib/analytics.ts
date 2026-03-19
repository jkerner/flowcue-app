/**
 * Stub analytics module for FlowCue.
 *
 * In development, events are logged to the console via the logger.
 * In production, this module should be wired to a real analytics
 * provider (e.g., Mixpanel, Amplitude, PostHog).
 */

import { logger } from './logger';

type EventProperties = Record<string, string | number | boolean | undefined>;

function isDevMode(): boolean {
  return typeof __DEV__ !== 'undefined' && __DEV__;
}

/**
 * Track an analytics event.
 */
export function track(
  eventName: string,
  properties?: EventProperties,
): void {
  if (isDevMode()) {
    logger.debug(`[Analytics] track: ${eventName}`, properties ?? {});
  }

  // TODO: forward to real analytics provider in production
}

/**
 * Identify the current user for analytics.
 */
export function identify(
  userId: string,
  traits?: EventProperties,
): void {
  if (isDevMode()) {
    logger.debug(`[Analytics] identify: ${userId}`, traits ?? {});
  }

  // TODO: forward to real analytics provider in production
}

/**
 * Reset the analytics identity (e.g., on logout).
 */
export function reset(): void {
  if (isDevMode()) {
    logger.debug('[Analytics] reset');
  }

  // TODO: forward to real analytics provider in production
}
