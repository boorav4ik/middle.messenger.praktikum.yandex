/* eslint-disable no-param-reassign */
import { PlainObject, isPlainObject } from "utils/types/PlainObject";

export function merge(target: PlainObject, source: PlainObject): PlainObject {
  if (!isPlainObject(target)) throw new Error("target must be plain object");
  if (!isPlainObject(source)) throw new Error("source must be plain object");
  Object.keys(source).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(source, key)) return;

    try {
      if (isPlainObject(source[key])) {
        source[key] = merge(target[key] as PlainObject, source[key] as PlainObject);
      } else {
        target[key] = source[key];
      }
    } catch (error) {
      target[key] = source[key];
    }
  });
  return target;
}
