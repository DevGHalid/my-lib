import * as VNode from './register-element';
import { updateAttrs } from './update-attribute';
import { createNodeFromObject } from './create-node-from-object';
import { TYPE_NODE } from '../types';

import { compareVNode } from '../../util/index';

export function updateNode(
  $parent: Node,
  newVNode: VNode.TVNode,
  oldVNode: VNode.TVNode,
  index: number = 0
): void {
  if (!newVNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (!oldVNode) {
    const $newNode = createNodeFromObject(newVNode);
    $parent.appendChild($newNode);
  } else if (compareVNode(newVNode, oldVNode)) {
    const $newNode = createNodeFromObject(newVNode);
    $parent.replaceChild($newNode, $parent.childNodes[index]);
  } else if (
    typeof newVNode === 'object' &&
    typeof oldVNode === 'object' &&
    (newVNode.type === TYPE_NODE.ELEMENT && oldVNode.type === TYPE_NODE.ELEMENT)
  ) {
    updateAttrs(
      $parent.childNodes[index],
      newVNode.props._attrs,
      oldVNode.props._attrs
    );

    const [newVNodeChild, oldVNodeChild] = [
      newVNode.props.children,
      oldVNode.props.children
    ];
    const [newLen, oldLen] = [newVNodeChild.length, oldVNodeChild.length];

    if (newLen >= oldLen) {
      // from the start
      for (let i = 0; i < newLen; i += 1) {
        const [newItem, oldItem] = [newVNodeChild[i], oldVNodeChild[i]];

        // next update
        updateNode(
          $parent.childNodes[index],
          newItem as VNode.TVNode,
          oldItem as VNode.TVNode,
          i
        );
      }
    } else {
      let i = oldLen;
      // from the end
      while (i--) {
        const [newItem, oldItem] = [newVNodeChild[i], oldVNodeChild[i]];

        // next update
        updateNode(
          $parent.childNodes[index],
          newItem as VNode.TVNode,
          oldItem as VNode.TVNode,
          i
        );
      }
    }
    // rewrite node
    (newVNode as VNode.IVElement)._rel = (oldVNode as VNode.IVElement)._rel;
  }
}
