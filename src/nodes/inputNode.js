// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeFormGroup, NodeLabel, NodeInput, NodeSelect } from './NodeFormElements';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`
        }
      ]}
    >
      <NodeFormGroup>
        <NodeLabel htmlFor={`${id}-name`}>Name</NodeLabel>
        <NodeInput
          id={`${id}-name`}
          type="text"
          value={currName}
          onChange={handleNameChange}
          placeholder="Enter input name"
        />
      </NodeFormGroup>
      <NodeFormGroup>
        <NodeLabel htmlFor={`${id}-type`}>Type</NodeLabel>
        <NodeSelect id={`${id}-type`} value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </NodeSelect>
      </NodeFormGroup>
    </BaseNode>
  );
}
