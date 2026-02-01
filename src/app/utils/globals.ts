import dayjs from "dayjs";

export const getDuration = (start: string, end: string) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
  
    const days = endDate.diff(startDate, 'day');
  
    if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  
    const weeks = endDate.diff(startDate, 'week');
    if (weeks < 4) {
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    }
  
    const months = endDate.diff(startDate, 'month');
    return `${months} month${months > 1 ? 's' : ''}`;
  };
  
  export function formatToNaira(
    amount: number | string,
    options?: {
      showSymbol?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    },
  ) {
    const value = Number(amount) / 100;
  
    return new Intl.NumberFormat('en-NG', {
      style: options?.showSymbol === false ? 'decimal' : 'currency',
      currency: 'NGN',
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    }).format(value);
  }
  