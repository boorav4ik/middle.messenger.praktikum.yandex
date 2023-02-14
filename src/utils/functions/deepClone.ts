import { PlainObject, isPlainObject } from "types/PlainObject";

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function clone(value: any): any {
  if (isPlainObject(value)) {
    const output: PlainObject = {};
    Object.keys(value).forEach((key) => {
      output[key as keyof PlainObject] = clone(value[key]);
    });
    return output;
  }
  if (isArray(value)) {
    const output: unknown[] = [];
    Object.keys(value).forEach((key) => output.push(clone(value[key as keyof []])));
    return output;
  }

  return value;
}

export function cloneDeep(obj: PlainObject): PlainObject {
  if (!isPlainObject(obj)) throw new Error("Аргумент может быть только объектом");

  return clone(obj);
}
