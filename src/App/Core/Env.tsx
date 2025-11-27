// Core environment configuration
export const ENV = {
  API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.qutli.com',
  APP_NAME: 'Qutli',
  APP_VERSION: '1.0.0',
  DEMO_CREDENTIALS: {
    'demo@qutli.com': 'demo123',
    'user@test.com': 'password',
    'admin@qutli.com': 'admin123',
  },
} as const;

export const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  ONBOARDING_COMPLETE: '@onboarding_complete',
  CART_DATA: '@cart_data',
} as const;

export const COLORS = {
  PRIMARY: '#FF6B9D',
  SECONDARY: '#6B9DFF',
  SUCCESS: '#4CAF50',
  ERROR: '#FF3B30',
  WARNING: '#FFB800',
  BACKGROUND: '#FFFFFF',
  SURFACE: '#F5F5F5',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  TEXT_DISABLED: '#999999',
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 40,
} as const;

export const BORDER_RADIUS = {
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  FULL: 999,
} as const;

