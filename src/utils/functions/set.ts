import { merge } from "./merge";
import { PlainObject, isPlainObject } from "../types/PlainObject";

export function set(target: PlainObject | unknown, path: string, value: any): PlainObject {
  if (!isPlainObject(target)) throw new Error("target must be plain object");
  if (typeof path !== "string") throw new Error("path must be string");
  const output = path.split(".").reduceRight<PlainObject>(
    (acc, key) => ({
      [key]: acc
    }),
    value
  );
  return merge(target, output);
}
