import { registerVElement } from './core/vdom/register-element';
import { registerComponent } from './core/vdom/register-component';
import { observable } from './observer/observable';
import {
  observableVNode as watch,
  observableVNode
} from './core/observer/observable-vnode';
import {
  observableNodeWithKey as watchKey,
  observableNodeWithKey
} from './core/observer/observable-vnode-with-key';

const $ = registerVElement;

const Coverage = registerComponent(() => {
  const { $state, $notify } = observable({ value: '...', count: 0 });

  (window as any).a = $state;

  return $('div', null, [
    $('h1', null, ['App']),
    watch(
      () => {
        return $('div', { _attrs: { class: 'test' } }, [$state.value]);
      },
      (callback: Function) => {
        $notify(callback);
      }
    )
  ]);
});

export default registerComponent(() => {
  return $('div', { _attrs: { class: 'app' } }, [Coverage]);
});
