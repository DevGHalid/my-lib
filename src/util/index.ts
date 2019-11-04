const toString = Object.prototype.toString;

export function isDict(a: any): boolean {
  return toString.call(a) === '[object Object]';
}

export function showType(a: any): string {
  return toString.call(a).slice(1, -8);
}

export const { error, warn } = console;
export * from './vnode';
