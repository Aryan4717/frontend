// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { designTokens } from './designSystem';
import { preparePipelinePayload, submitPipeline } from './pipelineUtils';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [submitMessage, setSubmitMessage] = useState('');

    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate pipeline has content
        if (nodes.length === 0) {
            setSubmitStatus('error');
            setSubmitMessage('Pipeline is empty. Add at least one node.');
            setTimeout(() => setSubmitStatus(null), 3000);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitMessage('');

        try {
            // Prepare minimal payload
            const payload = preparePipelinePayload(nodes, edges);
            
            // Send to backend
            const result = await submitPipeline(payload);
            
            setSubmitStatus('success');
            setSubmitMessage(result.message || 'Pipeline submitted successfully!');
            
            // Clear message after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
                setSubmitMessage('');
            }, 5000);
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage(error.message || 'Failed to submit pipeline');
            
            // Clear error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
                setSubmitMessage('');
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: designTokens.spacing.xl,
        backgroundColor: designTokens.colors.bgPrimary,
        borderTop: `1px solid ${designTokens.colors.nodeBorder}`,
        gap: designTokens.spacing.md,
    };

    const buttonStyle = {
        padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
        fontSize: designTokens.typography.fontSize.base,
        fontWeight: designTokens.typography.fontWeight.semibold,
        color: '#ffffff',
        backgroundColor: isSubmitting 
            ? designTokens.colors.textSecondary 
            : designTokens.colors.primary,
        border: 'none',
        borderRadius: designTokens.borderRadius.md,
        cursor: isSubmitting ? 'not-allowed' : 'pointer',
        fontFamily: designTokens.typography.fontFamily,
        transition: `all ${designTokens.transitions.normal}`,
        boxShadow: designTokens.shadows.sm,
        minWidth: '120px',
        opacity: isSubmitting ? 0.7 : 1,
    };

    const messageStyle = {
        fontSize: designTokens.typography.fontSize.sm,
        color: submitStatus === 'success' 
            ? designTokens.colors.success 
            : submitStatus === 'error'
            ? designTokens.colors.error
            : 'transparent',
        textAlign: 'center',
        minHeight: '20px',
        transition: `color ${designTokens.transitions.normal}`,
    };

    return (
        <div style={containerStyle}>
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={buttonStyle}
                onMouseEnter={(e) => {
                    if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = designTokens.colors.primaryHover;
                        e.currentTarget.style.boxShadow = designTokens.shadows.md;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = designTokens.colors.primary;
                        e.currentTarget.style.boxShadow = designTokens.shadows.sm;
                        e.currentTarget.style.transform = 'translateY(0)';
                    }
                }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
            </button>
            {submitMessage && (
                <div style={messageStyle}>
                    {submitMessage}
                </div>
            )}
        </div>
    );
}
