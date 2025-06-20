/**
 * Utility functions for extending console.log method.
 *
 *
 *
 * @namespace
 */
export namespace logger {
  /**
   * Debug level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function debug(this: any, ...data: any[]): void {
    console.debug(`[${this.name}]`, ...data);
  }
  /**
   * Error level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function error(this: any, ...data: any[]): void {
    console.error(`[${this.name}]`, ...data);
  }
  /**
   * Information level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function info(this: any, ...data: any[]): void {
    console.info(`[${this.name}]`, ...data);
  }
  /**
   * Warning level log.
   * 
   * 
   * 
   * @param data The data to write to the browser console.
   */
  export function warn(this: any, ...data: any[]): void {
    console.warn(`[${this.name}]`, ...data);
  }
}
