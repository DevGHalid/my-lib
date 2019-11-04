import { defineAttr, removeAttr } from './define-attribute';

export function updateAttrs(
  target: Node,
  newAttrs: { [key: string]: any },
  oldAttrs: { [key: string]: any }
): void {
  const attrs = Object.assign({}, newAttrs, oldAttrs);

  for (let key in attrs) {
    updateAttr(target, key, newAttrs[key], oldAttrs[key]);
  }
}

function updateAttr(target: Node, key: string, newVal: any, oldVal: any): void {
  if (!newVal) {
    removeAttr(target as Element, key);
  } else if (!oldVal || newVal != oldVal) {
    defineAttr(target as Element, key, newVal);
  }
}
