// draggableNode.js

import { designTokens } from './designSystem';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.target.style.opacity = '0.7';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.opacity = '1';
    };
  
    const nodeStyle = {
      cursor: 'grab',
      minWidth: '100px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: designTokens.borderRadius.lg,
      backgroundColor: designTokens.colors.nodeBg,
      border: `1.5px solid ${designTokens.colors.nodeBorder}`,
      boxShadow: designTokens.shadows.sm,
      justifyContent: 'center',
      flexDirection: 'column',
      transition: `all ${designTokens.transitions.normal}`,
      fontFamily: designTokens.typography.fontFamily,
    };

    const labelStyle = {
      color: designTokens.colors.textPrimary,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      userSelect: 'none',
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        style={nodeStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = designTokens.colors.primary;
          e.currentTarget.style.boxShadow = designTokens.shadows.md;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = designTokens.colors.nodeBorder;
          e.currentTarget.style.boxShadow = designTokens.shadows.sm;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        draggable
      >
        <span style={labelStyle}>{label}</span>
      </div>
    );
  };
  