// PipelineResults.js
// Component to display pipeline submission results and statistics

import { designTokens } from './designSystem';

/**
 * Calculate pipeline statistics
 */
export const calculatePipelineStats = (nodes, edges) => {
  const nodeTypeCounts = {};
  let inputNodes = 0;
  let outputNodes = 0;
  let processingNodes = 0;

  nodes.forEach(node => {
    const type = node.type || node.data?.nodeType || 'unknown';
    nodeTypeCounts[type] = (nodeTypeCounts[type] || 0) + 1;
    
    if (type === 'customInput') inputNodes++;
    else if (type === 'customOutput') outputNodes++;
    else processingNodes++;
  });

  return {
    totalNodes: nodes.length,
    totalConnections: edges.length,
    nodeTypes: nodeTypeCounts,
    inputNodes,
    outputNodes,
    processingNodes,
    isConnected: edges.length > 0,
    hasInputs: inputNodes > 0,
    hasOutputs: outputNodes > 0,
  };
};

/**
 * Pipeline Results Panel Component
 */
export const PipelineResults = ({ nodes, edges, backendResponse, onClose }) => {
  const stats = calculatePipelineStats(nodes, edges);
  const isSuccess = backendResponse?.status === 'success' || backendResponse?.valid !== false;

  const panelStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: designTokens.colors.bgPrimary,
    borderRadius: designTokens.borderRadius.lg,
    boxShadow: designTokens.shadows.xl,
    padding: designTokens.spacing.xxl,
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    zIndex: 1000,
    border: `2px solid ${isSuccess ? designTokens.colors.success : designTokens.colors.error}`,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: designTokens.spacing.xl,
    paddingBottom: designTokens.spacing.md,
    borderBottom: `1px solid ${designTokens.colors.nodeBorder}`,
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.textPrimary,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: designTokens.typography.fontSize.xl,
    cursor: 'pointer',
    color: designTokens.colors.textSecondary,
    padding: designTokens.spacing.xs,
    lineHeight: 1,
  };

  const statCardStyle = {
    backgroundColor: designTokens.colors.bgSecondary,
    borderRadius: designTokens.borderRadius.md,
    padding: designTokens.spacing.lg,
    marginBottom: designTokens.spacing.md,
  };

  const statRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${designTokens.spacing.sm} 0`,
    borderBottom: `1px solid ${designTokens.colors.nodeBorder}`,
  };

  const statRowLastStyle = {
    ...statRowStyle,
    borderBottom: 'none',
  };

  const labelStyle = {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.textSecondary,
    fontWeight: designTokens.typography.fontWeight.medium,
  };

  const valueStyle = {
    fontSize: designTokens.typography.fontSize.base,
    color: designTokens.colors.textPrimary,
    fontWeight: designTokens.typography.fontWeight.semibold,
  };

  const statusBadgeStyle = {
    display: 'inline-block',
    padding: `${designTokens.spacing.xs} ${designTokens.spacing.md}`,
    borderRadius: designTokens.borderRadius.full,
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.semibold,
    backgroundColor: isSuccess 
      ? `${designTokens.colors.success}20`
      : `${designTokens.colors.error}20`,
    color: isSuccess 
      ? designTokens.colors.success
      : designTokens.colors.error,
    marginTop: designTokens.spacing.md,
  };

  const messageStyle = {
    backgroundColor: isSuccess 
      ? `${designTokens.colors.success}10`
      : `${designTokens.colors.error}10`,
    border: `1px solid ${isSuccess ? designTokens.colors.success : designTokens.colors.error}`,
    borderRadius: designTokens.borderRadius.md,
    padding: designTokens.spacing.md,
    marginTop: designTokens.spacing.md,
    color: designTokens.colors.textPrimary,
    fontSize: designTokens.typography.fontSize.sm,
  };

  const nodeTypeListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: `${designTokens.spacing.sm} 0 0 0`,
  };

  const nodeTypeItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${designTokens.spacing.xs} 0`,
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.textSecondary,
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={panelStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Pipeline Results</h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Status Badge */}
        <div style={statusBadgeStyle}>
          {isSuccess ? '✓ Valid Pipeline' : '✗ Validation Failed'}
        </div>

        {/* Pipeline Statistics */}
        <div style={statCardStyle}>
          <h3 style={{
            fontSize: designTokens.typography.fontSize.base,
            fontWeight: designTokens.typography.fontWeight.semibold,
            color: designTokens.colors.textPrimary,
            marginBottom: designTokens.spacing.md,
          }}>
            Pipeline Overview
          </h3>
          
          <div style={statRowStyle}>
            <span style={labelStyle}>Total Nodes</span>
            <span style={valueStyle}>{stats.totalNodes}</span>
          </div>
          
          <div style={statRowStyle}>
            <span style={labelStyle}>Connections</span>
            <span style={valueStyle}>{stats.totalConnections}</span>
          </div>
          
          <div style={statRowStyle}>
            <span style={labelStyle}>Input Nodes</span>
            <span style={valueStyle}>{stats.inputNodes}</span>
          </div>
          
          <div style={statRowStyle}>
            <span style={labelStyle}>Processing Nodes</span>
            <span style={valueStyle}>{stats.processingNodes}</span>
          </div>
          
          <div style={statRowLastStyle}>
            <span style={labelStyle}>Output Nodes</span>
            <span style={valueStyle}>{stats.outputNodes}</span>
          </div>
        </div>

        {/* Node Types Breakdown */}
        {Object.keys(stats.nodeTypes).length > 0 && (
          <div style={statCardStyle}>
            <h3 style={{
              fontSize: designTokens.typography.fontSize.base,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.textPrimary,
              marginBottom: designTokens.spacing.md,
            }}>
              Node Types
            </h3>
            <ul style={nodeTypeListStyle}>
              {Object.entries(stats.nodeTypes).map(([type, count]) => (
                <li key={type} style={nodeTypeItemStyle}>
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Backend Response Message */}
        {backendResponse?.message && (
          <div style={messageStyle}>
            <strong>Message:</strong> {backendResponse.message}
          </div>
        )}

        {/* Additional Backend Data */}
        {backendResponse && Object.keys(backendResponse).length > 1 && (
          <div style={statCardStyle}>
            <h3 style={{
              fontSize: designTokens.typography.fontSize.base,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.textPrimary,
              marginBottom: designTokens.spacing.md,
            }}>
              Validation Details
            </h3>
            {backendResponse.errors && backendResponse.errors.length > 0 && (
              <div style={{
                color: designTokens.colors.error,
                fontSize: designTokens.typography.fontSize.sm,
              }}>
                <strong>Issues found:</strong>
                <ul style={{ margin: `${designTokens.spacing.sm} 0 0 ${designTokens.spacing.lg}`, padding: 0 }}>
                  {backendResponse.errors.map((error, idx) => (
                    <li key={idx} style={{ marginBottom: designTokens.spacing.xs }}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {backendResponse.warnings && backendResponse.warnings.length > 0 && (
              <div style={{
                color: designTokens.colors.warning,
                fontSize: designTokens.typography.fontSize.sm,
                marginTop: designTokens.spacing.md,
              }}>
                <strong>Warnings:</strong>
                <ul style={{ margin: `${designTokens.spacing.sm} 0 0 ${designTokens.spacing.lg}`, padding: 0 }}>
                  {backendResponse.warnings.map((warning, idx) => (
                    <li key={idx} style={{ marginBottom: designTokens.spacing.xs }}>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

