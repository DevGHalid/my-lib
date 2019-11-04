import { isDict } from '../util/index';

type TListener = Function;

export function observable<T>(data: T) {
  const events: { [key: string]: Array<TListener> } = {};

  function $on(name: keyof T, listener: TListener): void {
    if (typeof name !== 'string') {
      throw new TypeError('The first argument must be a string');
    }

    if (typeof listener !== 'function') {
      throw new TypeError('The second argument must be a function');
    }

    if (!events.hasOwnProperty(name)) {
      events[name] = [];
    }

    events[name].push(listener);
  }

  function $off(name: keyof T): void {
    if (typeof name !== 'string') {
      throw new TypeError('The first argument must be a string');
    }

    events[name] = [];
  }

  const allEvents: Array<TListener> = [];

  function $notify(listener: TListener): void {
    if (typeof listener !== 'function') {
      throw new TypeError('The second argument must be a function');
    }

    allEvents.push(listener);
  }

  function $has(name: string) {
    return data.hasOwnProperty(name);
  }

  function apply(listeners: Array<TListener>) {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      // call
      listener();
    }
  }

  function define(name: string, value: any): void {
    Object.defineProperty(data, name, {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;

        if (events.hasOwnProperty(name)) {
          apply(events[name]);
        }

        apply(allEvents);
      }
    });
  }

  for (let key in data) {
    define(key, data[key]);
  }

  return { $on, $off, $has, $notify, $state: data };
}
