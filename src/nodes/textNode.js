// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeFormGroup, NodeLabel, NodeInput } from './NodeFormElements';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      outputs={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
    >
      <NodeFormGroup>
        <NodeLabel htmlFor={`${id}-text`}>Text Content</NodeLabel>
        <NodeInput
          id={`${id}-text`}
          type="text"
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text or template"
        />
      </NodeFormGroup>
    </BaseNode>
  );
}
