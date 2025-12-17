// BaseNode.js
// Reusable node container with common structure

import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable container for all node types
 * 
 * @param {string} id - Unique node identifier
 * @param {string} title - Node title/header
 * @param {Array} inputs - Array of input handle configurations
 *   [{ type: 'target', position: Position.Left, id: 'handle-id', style?: {...} }]
 * @param {Array} outputs - Array of output handle configurations
 *   [{ type: 'source', position: Position.Right, id: 'handle-id', style?: {...} }]
 * @param {ReactNode} children - Content slot for node-specific UI
 * @param {Object} style - Optional custom container styles
 */
export const BaseNode = ({ id, title, inputs = [], outputs = [], children, style = {} }) => {
  const baseStyle = {
    width: 200,
    height: 80,
    border: '1px solid black',
    position: 'relative',
    ...style
  };

  return (
    <div style={baseStyle}>
      {/* Input handles (typically on the left) */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type={input.type || 'target'}
          position={input.position || Position.Left}
          id={input.id || `${id}-input-${index}`}
          style={input.style}
        />
      ))}

      {/* Title/Header */}
      <div>
        <span>{title}</span>
      </div>

      {/* Content slot - node-specific content goes here */}
      <div>
        {children}
      </div>

      {/* Output handles (typically on the right) */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type={output.type || 'source'}
          position={output.position || Position.Right}
          id={output.id || `${id}-output-${index}`}
          style={output.style}
        />
      ))}
    </div>
  );
};

