// outputNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeFormGroup, NodeLabel, NodeInput, NodeSelect } from './NodeFormElements';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  // Sync to store when values change
  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
  }, [id, currName, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'outputType', outputType);
  }, [id, outputType, updateNodeField]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[
        {
          type: 'target',
          position: Position.Left,
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
          placeholder="Enter output name"
        />
      </NodeFormGroup>
      <NodeFormGroup>
        <NodeLabel htmlFor={`${id}-type`}>Type</NodeLabel>
        <NodeSelect id={`${id}-type`} value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </NodeSelect>
      </NodeFormGroup>
    </BaseNode>
  );
}
