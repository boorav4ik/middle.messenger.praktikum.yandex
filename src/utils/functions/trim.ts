export default function trim(original: string, pattern?: string): string {
  if (typeof original !== "string") throw new Error("The first argument must be a string");
  if (!pattern) return original.trim();
  const reg = new RegExp(`^[${pattern}]+|[${pattern}]+$`, "g");
  return original.replace(reg, "");
}
