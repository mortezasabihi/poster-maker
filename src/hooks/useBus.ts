import { useEffect } from 'react';

interface EventAction {
  type: string;
  [key: string]: any;
}

let subscribers: any[] = [];

const subscribe = <T>(filter: string, callback: (cb: EventAction & T) => void) => {
  if (filter === undefined || filter === null) return undefined;
  if (callback === undefined || callback === null) return undefined;

  subscribers = [...subscribers, [filter, callback]];

  return () => {
    subscribers = subscribers.filter((subscriber) => subscriber[1] !== callback);
  };
};

export const dispatch = (event: EventAction) => {
  let { type } = event;
  if (typeof event === 'string') type = event;

  const args: EventAction[] = [];
  if (typeof event === 'string') args.push({ type });
  else args.push(event);

  subscribers.forEach(([filter, callback]) => {
    if (typeof filter === 'string' && filter !== type) return;
    if (Array.isArray(filter) && !filter.includes(type)) return;
    if (filter instanceof RegExp && !filter.test(type)) return;
    if (typeof filter === 'function' && !filter(...args)) return;

    callback(...args);
  });
};

/**
 * useBus
 * @param type {string}
 * @param callback {Function}
 * @param deps
 * @returns {void}
 */
const useBus = <T>(
  type: string,
  callback: (cb: EventAction & T) => void,
  deps = []
): ((event: EventAction) => void) => {
  useEffect(() => subscribe<T>(type, callback), [callback, type, deps]);

  return dispatch;
};

export default useBus;
