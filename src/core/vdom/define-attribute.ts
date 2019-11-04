export interface IAttrs {
  [key: string]: any;
}

export function defineAttrs(target: Element, attrs: { [key: string]: any }) {
  for (let key in attrs) {
    const value = attrs[key];

    target.setAttribute(key, value);
  }
}

export function defineAttr(target: Element, name: string, value: any) {
  target.setAttribute(name, value);
}

export function removeAttr(target: Element, name: string): void {
  target.removeAttribute(name);
}
