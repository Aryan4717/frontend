// BaseNode.js
// Reusable node container with common structure

import { Handle, Position } from 'reactflow';
import { designTokens } from '../designSystem';

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
    width: 240,
    minHeight: 100,
    height: 'auto', // Allow node to grow with content
    backgroundColor: designTokens.colors.nodeBg,
    border: `1.5px solid ${designTokens.colors.nodeBorder}`,
    borderRadius: designTokens.borderRadius.lg,
    boxShadow: designTokens.shadows.md,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: `all ${designTokens.transitions.normal}`,
    fontFamily: designTokens.typography.fontFamily,
    overflow: 'visible', // Ensure content is not clipped
    ...style
  };

  const headerStyle = {
    padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
    borderBottom: `1px solid ${designTokens.colors.nodeBorder}`,
    backgroundColor: designTokens.colors.bgSecondary,
    borderTopLeftRadius: designTokens.borderRadius.lg,
    borderTopRightRadius: designTokens.borderRadius.lg,
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.textPrimary,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
  };

  const contentStyle = {
    padding: designTokens.spacing.lg,
    flex: '1 1 auto', // Allow content to grow and shrink
    display: 'flex',
    flexDirection: 'column',
    gap: designTokens.spacing.md,
    minHeight: 0, // Allow shrinking below content size
    overflow: 'visible', // Ensure all content is visible
  };

  const handleStyle = {
    width: '12px',
    height: '12px',
    backgroundColor: designTokens.colors.handleBg,
    border: `2px solid ${designTokens.colors.handleBorder}`,
    borderRadius: '50%',
  };

  return (
    <div 
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = designTokens.colors.nodeBorderHover;
        e.currentTarget.style.boxShadow = designTokens.shadows.lg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = designTokens.colors.nodeBorder;
        e.currentTarget.style.boxShadow = designTokens.shadows.md;
      }}
    >
      {/* Input handles (typically on the left) */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type={input.type || 'target'}
          position={input.position || Position.Left}
          id={input.id || `${id}-input-${index}`}
          style={{
            ...handleStyle,
            ...input.style
          }}
        />
      ))}

      {/* Title/Header */}
      <div style={headerStyle}>
        <span style={titleStyle}>{title}</span>
      </div>

      {/* Content slot - node-specific content goes here */}
      <div style={contentStyle}>
        {children}
      </div>

      {/* Output handles (typically on the right) */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type={output.type || 'source'}
          position={output.position || Position.Right}
          id={output.id || `${id}-output-${index}`}
          style={{
            ...handleStyle,
            ...output.style
          }}
        />
      ))}
    </div>
  );
};

