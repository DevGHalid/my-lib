import * as VNode from './register-element';
import { createNodeFromObject } from './create-node-from-object';
import { updateNode } from './update-node';

function extractKeyFromVNode(vnodes: Array<VNode.IVElement>) {
  return vnodes.map(vnode => vnode.props.key);
}

function updateAndInsertVNodesWithKey(
  $parent: Node,
  newVNode: Array<VNode.IVElement>,
  oldVNode: Array<VNode.IVElement>
): void {
  const keysWithVNode = extractKeyFromVNode(oldVNode);
  for (let j = 0; j < newVNode.length; j++) {
    const newItem = newVNode[j];
    const idx = keysWithVNode.indexOf(newItem.props.key);

    if (idx == -1) {
      $parent.insertBefore(
        createNodeFromObject(newItem),
        $parent.childNodes[j]
      );
    } else {
      delete oldVNode[idx];
    }
  }

  oldVNode.forEach(vnode => $parent.removeChild(vnode._rel));
}

function updateAndRemoveVNodesWithKey(
  $parent: Node,
  newVNode: Array<VNode.IVElement>,
  oldVNode: Array<VNode.IVElement>
): void {
  const keysWithVNode = extractKeyFromVNode(oldVNode);
  const listIndex = newVNode.map(({ props }) =>
    keysWithVNode.indexOf(props.key)
  );

  for (let i = 0; i < listIndex.length; i++) {
    const index = listIndex[i];

    if (index != -1) {
      newVNode[i]._rel = oldVNode[index]._rel;
      delete oldVNode[index];
    } else {
      $parent.insertBefore(
        createNodeFromObject(newVNode[i]),
        $parent.childNodes[i]
      );
    }
  }

  oldVNode.forEach(oldItem => $parent.removeChild(oldItem._rel));
}

export function updateNodeWithKey(
  $parent: Node,
  newVNode: Array<VNode.IVElement>,
  oldVNode: Array<VNode.IVElement>
): void {
  const [newLength, oldLength] = [newVNode.length, oldVNode.length];
  if (newLength > oldLength) {
    updateAndInsertVNodesWithKey($parent, newVNode, oldVNode);
  } else if (newLength < oldLength) {
    updateAndRemoveVNodesWithKey($parent, newVNode, oldVNode);
  } else {
    for (let i = 0; i < newLength; i++) {
      const [newItem, oldItem] = [newVNode[i], oldVNode[i]];
      updateNode($parent, newItem, oldItem, i);
    }
  }
}
