export interface IEvent {
  [key: string]: EventListener;
}
export function defineEvents(target: Element, events: IEvent) {
  for (let event in events) {
    const listener = events[event];
    if (typeof listener === 'function') {
      addEvent(target, event, listener);
    }
  }
}

function addEvent(
  target: Element,
  event: string,
  listener: EventListener
): void {
  target.addEventListener(event, listener);
}
