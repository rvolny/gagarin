// Global constants
export const LOG_OFF = 0;
export const LOG_FATAL = 1;
export const LOG_ERROR = 2;
export const LOG_WARN = 3;
export const LOG_INFO = 4;
export const LOG_DEBUG = 5;
export const LOG_TRACE = 6;
export const LOG_LEVEL = process.env.VUE_APP_LOG_LEVEL || 0;
export const BASE_API_URL = process.env.VUE_APP_BASE_API_URL ||
  'http://raketa.local/api';
