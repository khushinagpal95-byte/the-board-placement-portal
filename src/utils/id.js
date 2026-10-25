// Small random id for new jobs (no library needed)
export const makeId = () => Math.random().toString(36).slice(2, 9);
