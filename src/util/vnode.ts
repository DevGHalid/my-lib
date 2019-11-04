import { isDict } from './index';

import * as VNode from '../core/vdom/register-element';

export function isVElementNode(vnode: VNode.IVElement): boolean {
  return (
    isDict(vnode) &&
    Boolean(vnode.type && vnode.name && vnode.props && vnode.props.children)
  );
}

export function checkValidateVElementNode(vnode: VNode.IVElement): boolean {
  return isVElementNode(vnode);
}

export function compareVNode(node1: any, node2: any): boolean {
  return (
    (typeof node1 === 'string' && node1 !== node2) ||
    (typeof node1 === 'object' &&
      typeof node2 === 'object' &&
      node1.name !== node2.name)
  );
}

export function findDiffVNode(
  node1: Array<VNode.IVElement>,
  node2: Array<VNode.IVElement>
): any {
  const arr = [];

  for (let i = 0; i < node1.length; i++) {
    arr[i] = node1[i].props.key;
  }

  const diff: any = [];
  for (let j = 0; j < node2.length; j++) {}

  return diff;
}
