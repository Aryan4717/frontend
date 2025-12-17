// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeFormGroup, NodeLabel, NodeTextarea } from './NodeFormElements';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Set initial height on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

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
        <NodeTextarea
          ref={textareaRef}
          id={`${id}-text`}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text or template"
          rows={2}
        />
      </NodeFormGroup>
    </BaseNode>
  );
}
