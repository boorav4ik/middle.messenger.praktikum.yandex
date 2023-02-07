import { PlainObject, isPlainObject } from "../types/PlainObject";

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export default function isEqual(lhs: any, rhs: any) {
  if (typeof lhs !== typeof rhs) return false;
  if (!isArrayOrObject(lhs)) return lhs === rhs;
  if (Object.keys(lhs).length !== Object.keys(rhs).length) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, lValue] of Object.keys(lhs)) {
    const rValue = rhs[key];
    if (isArrayOrObject(lValue) && isArrayOrObject(rValue)) {
      // eslint-disable-next-line no-continue
      if (isEqual(lValue, rValue)) continue;
      return false;
    }

    if (lValue !== rValue) {
      return false;
    }
  }

  return true;
}
