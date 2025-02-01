export const getToday = (options = {}) => {
  const today = new Date();

  if (options?.end) {
    today.setHours(23, 59, 59, 999);
  } else {
    today.setHours(0, 0, 0, 0);
  }
  return today.toISOString()
};

