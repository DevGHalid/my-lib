import * as VNode from '../vdom/register-element';
import { updateNode } from '../vdom/update-node';
import { nodeIndexOf } from '../helpers/index';

export function observableVNode(
  builder: () => VNode.IVElement,
  listener: Function
): VNode.IVElement {
  if (typeof builder !== 'function') {
    throw new TypeError('The argument must be a function');
  }

  // initialize variables
  let vnode = builder();
  let $parent: Node;
  let startIndex: number;

  // apply listner
  listener(() => {
    if (!$parent) {
      $parent = vnode._rel.parentNode;
    }

    if (!startIndex) {
      const childNodes = $parent.childNodes;
      startIndex = nodeIndexOf(vnode._rel, childNodes);
    }

    // new vnode
    const newVNode = builder();

    // update node
    updateNode($parent, newVNode, vnode, startIndex);

    // rewrite vdom to vndom
    vnode = newVNode;
  });

  return vnode;
}
