const WEEK = 7 * 24 * 3600 * 1000;

const options = (messageDate: Date): Record<string, string> => {
  const now = new Date();
  if (now.getDay() === messageDate.getDay()) return { hour: "numeric", minute: "numeric" };
  if (now - messageDate < WEEK) return { weekday: "long" };
  return { year: "numeric", month: "long", day: "numeric" };
};
export default function formatMessageTime(time: string): string {
  const messageDate = new Date(time);
  return messageDate.toLocaleString("ru", options(messageDate));
}
