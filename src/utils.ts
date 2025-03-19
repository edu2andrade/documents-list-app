/**
 * Formats a date as a relative time string (e.g., "2 minutes ago", "in 3 days")
 * @param date The date to format (ISO string or Date object)
 * @param locale The locale to use for formatting (defaults to 'en')
 * @returns A relative time string
 */
export function formatRelativeTime(date: string | Date, locale: string = 'en') {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInMs = dateObj.getTime() - now.getTime();

  // Convert to seconds
  const diffInSecs = Math.floor(diffInMs / 1000);

  // Time units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Define time unit thresholds and their corresponding formats
  const timeUnits = [
    { threshold: minute, unit: 'second', divisor: 1 },
    { threshold: hour, unit: 'minute', divisor: minute },
    { threshold: day, unit: 'hour', divisor: hour },
    { threshold: week, unit: 'day', divisor: day },
    { threshold: month, unit: 'week', divisor: week },
    { threshold: year, unit: 'month', divisor: month },
    { threshold: Infinity, unit: 'year', divisor: year },
  ];

  // Check if Intl.RelativeTimeFormat is available
  if (typeof Intl !== 'undefined' && Intl.RelativeTimeFormat) {
    const formatter = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
      style: 'long',
    });

    const absSeconds = Math.abs(diffInSecs);
    const timeUnit = timeUnits.find((unit) => absSeconds < unit.threshold) || timeUnits[timeUnits.length - 1];

    return formatter.format(Math.round(diffInSecs / timeUnit.divisor), timeUnit.unit as Intl.RelativeTimeFormatUnit);
  } else {
    // Fallback implementation when Intl.RelativeTimeFormat is not available
    const absSeconds = Math.abs(diffInSecs);
    const timeUnit = timeUnits.find((unit) => absSeconds < unit.threshold) || timeUnits[timeUnits.length - 1];
    const value = Math.round(absSeconds / timeUnit.divisor);
    const unitStr = value === 1 ? timeUnit.unit : `${timeUnit.unit}s`;
    const isPast = diffInSecs < 0;

    return isPast ? `${value} ${unitStr} ago` : `in ${value} ${unitStr}`;
  }
}
