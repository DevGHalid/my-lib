import { TYPE_NODE } from '../types';
import * as attr from './define-attribute';
import * as event from './define-event';
import * as Comp from './register-component';

// interface for virtual the node element
export interface IVElement {
  type: TYPE_NODE.ELEMENT;
  name: string;
  props: IProps;
  _rel?: Element;
}

// type for node
export type TVNode = IVElement | string;

// type for nodes
export type TVNodes = Array<TVNode>;

// inteface for props
export interface IProps {
  children?: Array<TVNode | Comp.IComponent>;
  key?: any;

  _on?: event.IEvent;
  _attrs?: attr.IAttrs;
}

export type TVNodeOrComponent = TVNode | TVNodes | Comp.IComponent;

// create virtual element
export function registerVElement(
  name: string,
  props: IProps,
  children: Array<TVNodeOrComponent>
): IVElement {
  props = props || {};
  props.children = children as any;
  return { type: TYPE_NODE.ELEMENT, name, props, _rel: null };
}
