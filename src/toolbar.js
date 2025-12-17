// toolbar.js

import { DraggableNode } from './draggableNode';
import { designTokens } from './designSystem';

export const PipelineToolbar = () => {
    const containerStyle = {
        padding: `${designTokens.spacing.xl} ${designTokens.spacing.lg}`,
        backgroundColor: designTokens.colors.bgPrimary,
        borderBottom: `1px solid ${designTokens.colors.nodeBorder}`,
        boxShadow: designTokens.shadows.sm,
    };

    const titleStyle = {
        fontSize: designTokens.typography.fontSize.lg,
        fontWeight: designTokens.typography.fontWeight.semibold,
        color: designTokens.colors.textPrimary,
        marginBottom: designTokens.spacing.md,
        fontFamily: designTokens.typography.fontFamily,
    };

    const nodesContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: designTokens.spacing.md,
        alignItems: 'center',
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Node Palette</h2>
            <div style={nodesContainerStyle}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
