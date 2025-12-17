// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: { top: `${100/3}%` }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: `${200/3}%` }
        }
      ]}
      outputs={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`
        }
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
