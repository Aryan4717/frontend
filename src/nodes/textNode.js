// textNode.js

import { useState, useRef, useEffect, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeFormGroup, NodeLabel, NodeTextarea } from './NodeFormElements';

/**
 * Parse {{variable}} patterns from text and return unique variable names
 * @param {string} text - Text to parse
 * @returns {Array<string>} Array of unique variable names
 */
const parseVariables = (text) => {
  if (!text) return [];
  
  // Match {{variable}} pattern, capturing the variable name
  const regex = /\{\{(\w+)\}\}/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]); // match[1] is the captured variable name
  }
  
  // Return unique variables only (deduplication)
  return [...new Set(matches)];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Parse variables from text reactively
  const variables = useMemo(() => parseVariables(currText), [currText]);

  // Generate input handles dynamically based on variables
  const inputHandles = useMemo(() => {
    if (variables.length === 0) return [];
    
    return variables.map((variable, index) => {
      // Position handles evenly along the left side
      // First handle at 20%, last at 80%, distributed evenly
      const totalHandles = variables.length;
      const positionPercent = totalHandles === 1 
        ? 50 // Center if only one handle
        : 20 + (index / (totalHandles - 1)) * 60; // Distribute between 20% and 80%
      
      return {
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`, // Use variable name in handle ID
        style: {
          top: `${positionPercent}%`
        }
      };
    });
  }, [variables, id]);

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
      inputs={inputHandles}
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
          placeholder="Enter text or template (use {{variable}} for inputs)"
          rows={2}
        />
        {variables.length > 0 && (
          <div style={{
            fontSize: '11px',
            color: '#64748b',
            marginTop: '4px',
            fontStyle: 'italic'
          }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </NodeFormGroup>
    </BaseNode>
  );
}
