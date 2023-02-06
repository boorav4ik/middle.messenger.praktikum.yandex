const WEEK = 7 * 24 * 3600 * 1000;

const options = (messageDate: Date): Record<string, string> => {
  const now = new Date();
  if (now.getDay() === messageDate.getDay()) return { hour: "numeric", minute: "numeric" };
  if (now.valueOf() - messageDate.valueOf() < WEEK) return { weekday: "short" };
  return { year: "numeric", month: "short", day: "numeric" };
};
export function formatMessageTime(time: string): string {
  const messageDate = new Date(time);
  return messageDate.toLocaleString("ru", options(messageDate));
}
