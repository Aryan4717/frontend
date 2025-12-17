// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { designTokens } from '../designSystem';

export const LLMNode = ({ id, data }) => {
  const descriptionStyle = {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: designTokens.spacing.sm,
  };

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
      <span style={descriptionStyle}>Large Language Model</span>
    </BaseNode>
  );
}
