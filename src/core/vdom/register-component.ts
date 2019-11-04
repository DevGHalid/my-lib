import * as VNode from './register-element';
import { isVElementNode, isDict, error } from '../../util/index';
import { TYPE_NODE } from '../types';

interface IComponentProps {
  [key: string]: any;
}

interface IComponentSlots {
  [key: string]: any;
}

interface ILifyCycles {
  beforeRender?(): void;
  afterRender?(): void;

  beforeUpdateRender?(): void;
  afterUpdateRender?(): void;

  destroy?(): void;
}

type TComponentContent = (
  props: IComponentProps,
  slots: IComponentSlots
) => VNode.TVNode;

export interface IComponent {
  type: TYPE_NODE.COMPONENT;
  name: null | string;
  resolve(props: IComponentProps, slots?: IComponentSlots): VNode.TVNode;
}

export function registerComponent(render: TComponentContent): IComponent {
  if (typeof render !== 'function') {
    throw new TypeError('The argument must be a function');
  }

  function resolve(
    props: IComponentProps = {},
    slots: IComponentSlots = {}
  ): VNode.TVNode {
    return render(props, slots);
  }

  return { type: TYPE_NODE.COMPONENT, name: null, resolve };
}
