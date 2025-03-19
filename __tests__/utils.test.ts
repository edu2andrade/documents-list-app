import { formatRelativeTime } from '@/utils';

// Mock the Date object for consistent testing
const mockDate = new Date('2025-03-19T06:11:58+01:00');
jest.useFakeTimers();
jest.setSystemTime(mockDate);

describe('formatRelativeTime', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should format time in the past - seconds', () => {
    const date = new Date(mockDate.getTime() - 30 * 1000); // 30 seconds ago
    expect(formatRelativeTime(date)).toBe('30 seconds ago');
  });

  test('should format time in the past - minute', () => {
    const date = new Date(mockDate.getTime() - 60 * 1000); // 1 minute ago
    expect(formatRelativeTime(date)).toBe('1 minute ago');
  });

  test('should format time in the past - minutes', () => {
    const date = new Date(mockDate.getTime() - 5 * 60 * 1000); // 5 minutes ago
    expect(formatRelativeTime(date)).toBe('5 minutes ago');
  });

  test('should format time in the past - hour', () => {
    const date = new Date(mockDate.getTime() - 60 * 60 * 1000); // 1 hour ago
    expect(formatRelativeTime(date)).toBe('1 hour ago');
  });

  test('should format time in the past - hours', () => {
    const date = new Date(mockDate.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago
    expect(formatRelativeTime(date)).toBe('5 hours ago');
  });

  test('should format time in the past - day', () => {
    const date = new Date(mockDate.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    expect(formatRelativeTime(date)).toBe('yesterday');
  });

  test('should format time in the past - days', () => {
    const date = new Date(mockDate.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
    expect(formatRelativeTime(date)).toBe('3 days ago');
  });

  test('should format time in the past - week', () => {
    const date = new Date(mockDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
    expect(formatRelativeTime(date)).toBe('last week');
  });

  test('should format time in the past - month', () => {
    const date = new Date(mockDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 1 month ago
    expect(formatRelativeTime(date)).toBe('last month');
  });

  test('should format time in the past - year', () => {
    const date = new Date(mockDate.getTime() - 365 * 24 * 60 * 60 * 1000); // 1 year ago
    expect(formatRelativeTime(date)).toBe('last year');
  });

  test('should format time in the future - seconds', () => {
    const date = new Date(mockDate.getTime() + 30 * 1000); // in 30 seconds
    expect(formatRelativeTime(date)).toBe('in 30 seconds');
  });

  test('should format time in the future - minute', () => {
    const date = new Date(mockDate.getTime() + 60 * 1000); // in 1 minute
    expect(formatRelativeTime(date)).toBe('in 1 minute');
  });

  test('should format time in the future - hour', () => {
    const date = new Date(mockDate.getTime() + 60 * 60 * 1000); // in 1 hour
    expect(formatRelativeTime(date)).toBe('in 1 hour');
  });

  test('should format time in the future - day', () => {
    const date = new Date(mockDate.getTime() + 24 * 60 * 60 * 1000); // in 1 day
    expect(formatRelativeTime(date)).toBe('tomorrow');
  });

  test('should handle ISO string dates', () => {
    const isoDate = new Date(mockDate.getTime() - 5 * 60 * 1000).toISOString(); // 5 minutes ago
    expect(formatRelativeTime(isoDate)).toBe('5 minutes ago');
  });

  test('should use provided locale', () => {
    // This test assumes that the Intl.RelativeTimeFormat is available in the testing environment
    const date = new Date(mockDate.getTime() - 5 * 60 * 1000); // 5 minutes ago

    // Note: This test might be environment-dependent based on available locales
    // For simplicity, we'll just verify that a different locale is used
    const result = formatRelativeTime(date, 'es');

    // Just verify it's not the English version
    expect(result).not.toBe('5 minutes ago');
  });

  test('should handle fallback when Intl.RelativeTimeFormat is not available', () => {
    const date = new Date(mockDate.getTime() - 5 * 60 * 1000); // 5 minutes ago

    // Temporarily remove Intl.RelativeTimeFormat
    const originalIntl = global.Intl;
    const mockIntl = {
      ...originalIntl,
    };
    // @ts-ignore - We're intentionally setting RelativeTimeFormat to undefined for testing
    mockIntl.RelativeTimeFormat = undefined;
    global.Intl = mockIntl;

    expect(formatRelativeTime(date)).toBe('5 minutes ago');

    // Restore the original Intl object
    global.Intl = originalIntl;
  });
});
