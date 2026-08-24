export const formatPrice = (amount: number): string => {
  return `£${amount}`;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  return `${minutes} mins`;
};

export const formatDateFriendly = (dateString: string): string => {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};
