// submit.js

import { designTokens } from './designSystem';

export const SubmitButton = () => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: designTokens.spacing.xl,
        backgroundColor: designTokens.colors.bgPrimary,
        borderTop: `1px solid ${designTokens.colors.nodeBorder}`,
    };

    const buttonStyle = {
        padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
        fontSize: designTokens.typography.fontSize.base,
        fontWeight: designTokens.typography.fontWeight.semibold,
        color: '#ffffff',
        backgroundColor: designTokens.colors.primary,
        border: 'none',
        borderRadius: designTokens.borderRadius.md,
        cursor: 'pointer',
        fontFamily: designTokens.typography.fontFamily,
        transition: `all ${designTokens.transitions.normal}`,
        boxShadow: designTokens.shadows.sm,
        minWidth: '120px',
    };

    return (
        <div style={containerStyle}>
            <button 
                type="submit"
                style={buttonStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = designTokens.colors.primaryHover;
                    e.currentTarget.style.boxShadow = designTokens.shadows.md;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = designTokens.colors.primary;
                    e.currentTarget.style.boxShadow = designTokens.shadows.sm;
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
