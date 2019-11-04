export function nodeIndexOf(node: Node, nodes: NodeList): number {
  return Array.prototype.slice.call(nodes).indexOf(node);
}
