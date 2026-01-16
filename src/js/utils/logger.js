/**
 * Development-only Logger Utility
 * 
 * All log methods are no-ops in production builds.
 * Uses Vite's import.meta.env.DEV to detect environment.
 */

const isDev = import.meta.env.DEV;

const logger = {
  log: isDev ? console.log.bind(console) : () => {},
  warn: isDev ? console.warn.bind(console) : () => {},
  error: isDev ? console.error.bind(console) : () => {},
  info: isDev ? console.info.bind(console) : () => {},
  debug: isDev ? console.debug.bind(console) : () => {},
  
  // Group methods
  group: isDev ? console.group.bind(console) : () => {},
  groupEnd: isDev ? console.groupEnd.bind(console) : () => {},
  groupCollapsed: isDev ? console.groupCollapsed.bind(console) : () => {},
  
  // Table and trace
  table: isDev ? console.table.bind(console) : () => {},
  trace: isDev ? console.trace.bind(console) : () => {},
  
  // Timing
  time: isDev ? console.time.bind(console) : () => {},
  timeEnd: isDev ? console.timeEnd.bind(console) : () => {},
  
  // Check if in dev mode
  isDev
};

export default logger;
