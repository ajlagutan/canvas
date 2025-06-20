/**
 * Utility functions for extending console.log method.
 *
 *
 *
 * @namespace
 */
export namespace logger {
  enum levels {
    trace = 0,
    debug = 1,
    info = 2,
    warn = 4,
    error = 8,
    none = 16,
  }
  /**
   * Debug level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function debug(this: any, ...data: any[]): void {
    _log.call(this, levels.debug, ...data);
  }
  /**
   * Error level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function error(this: any, ...data: any[]): void {
    _log.call(this, levels.error, ...data);
  }
  /**
   * Information level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function info(this: any, ...data: any[]): void {
    _log.call(this, levels.info, ...data);
  }
  /**
   * Log to browser console.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function log(this: any, ...data: any[]): void {
    _log.call(this, levels.none, ...data);
  }
  /**
   * Trace level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function trace(this: any, ...data: any[]): void {
    _log.call(this, levels.trace, ...data);
  }
  /**
   * Warning level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function warn(this: any, ...data: any[]): void {
    _log.call(this, levels.warn, ...data);
  }
  /**
   * Logs a data to the browser console with level category.
   *
   *
   *
   * @param level Log level category.
   * @param data The data to write to the browser console.
   */
  function _log(this: any, level: levels, ...data: any[]): void {
    let fn;
    switch (level) {
      case levels.trace:
        fn = console.trace;
        break;
      case levels.debug:
        fn = console.debug;
        break;
      case levels.info:
        fn = console.info;
        break;
      case levels.warn:
        fn = console.warn;
        break;
      case levels.error:
        fn = console.error;
        break;
      case levels.none:
      default:
        fn = console.log;
        break;
    }
    if (this.name) {
      fn(`[${this.name}]`, ...data);
      return;
    }
    fn(...data);
  }
}
