import { isDict } from '../../util/index';
import { TYPE_NODE } from '../types';
import { defineAttrs } from './define-attribute';
import * as VNode from './register-element';
import * as Comp from './register-component';
import { defineEvents } from './define-event';

export function createNodeFromObject(
  node: string | VNode.TVNode | Comp.IComponent
): Node {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else if (isDict(node)) {
    switch (node.type) {
      case TYPE_NODE.ELEMENT:
        const $node = document.createElement(node.name);
        node._rel = $node;

        return resolveProps($node, node.props);
      case TYPE_NODE.COMPONENT:
        const comp = node.resolve({}, {});
        return createNodeFromObject(comp);
    }
  } else {
    return null;
  }
}

function resolveProps($node: Element, props: VNode.IProps): Element {
  for (let key in props) {
    const item = (props as any)[key];
    switch (key) {
      case 'children':
        for (let children of item) {
          addingVNodeToNode($node, children);
        }
        break;
      case '_on':
        defineEvents($node, item);
        break;
      case '_attrs':
        defineAttrs($node, item);
        break;
      case 'key':
        break;
    }
  }

  return $node;
}

function addingVNodeToNode($node: Element, vnode: VNode.TVNodeOrComponent) {
  if (Array.isArray(vnode)) {
    for (let child of vnode) {
      $node.appendChild(createNodeFromObject(child));
    }
  } else {
    const child = createNodeFromObject(vnode);
    $node.appendChild(child);
  }
}
