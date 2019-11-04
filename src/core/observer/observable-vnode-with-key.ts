import * as VNode from '../vdom/register-element';
import { updateNodeWithKey } from '../vdom/update-node-with-key';
import { nodeIndexOf } from '../helpers/index';

// function removeVNodesWithKey(
//   $parent: Node,
//   newVNode: Array<VNode.IVElement>,
//   oldVNode: Array<VNode.IVElement>,
//   index: number = 0
// ) {
//   const keysWithVNode = extractKeyFromVNode(newVNode);
//   let j = oldVNode.length;
//   let isRerender = false;

//   while (j--) {
//     const oldItem = oldVNode[j];
//     const oldKey = oldItem.props.key;
//     const idx = keysWithVNode.indexOf(oldKey);

//     if (idx == -1) {
//       updateNode($parent, null, null, j);
//     }
//   }

//   newVNode.forEach((newItem, i) => {
//     updateNode($parent, newItem, oldVNode[i], i);
//   });
// }

// function insertVNodesWithKey(
//   $parent: Node,
//   newVNode: Array<VNode.IVElement>,
//   oldVNode: Array<VNode.IVElement>,
//   index: number = 0
// ) {
//   const keysWithVNode = extractKeyFromVNode(oldVNode);

//   for (let j = 0; j < newVNode.length; j++) {
//     const newItem = newVNode[j];
//     const idx = keysWithVNode.indexOf(newItem.props.key);

//     if (idx == -1) {
//       $parent.insertBefore(
//         createNodeFromObject(newItem),
//         $parent.childNodes[j]
//       );
//     } else {
//       delete oldVNode[idx];
//     }
//   }

//   oldVNode.forEach(vnode => $parent.removeChild(vnode._rel));
// }

export function observableNodeWithKey(
  builder: () => Array<VNode.IVElement>,
  listener: Function
): Array<VNode.IVElement> {
  let vnode = builder();
  let $parent: Node;
  let startIndex: number;

  listener(() => {
    let newVNode = builder();

    if (vnode[0]._rel != undefined) {
      $parent = vnode[0]._rel.parentNode;
    }
    updateNodeWithKey($parent, newVNode, vnode);
    vnode = newVNode;
  });

  return vnode;
}
