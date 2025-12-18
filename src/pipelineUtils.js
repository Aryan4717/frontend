// pipelineUtils.js
// Utilities for preparing and sending pipeline data

/**
 * Prepare minimal pipeline payload for backend validation
 * Strips ReactFlow-specific fields and keeps only essential data
 * 
 * @param {Array} nodes - ReactFlow nodes array
 * @param {Array} edges - ReactFlow edges array
 * @returns {Object} Minimal payload with nodes and edges
 */
export const preparePipelinePayload = (nodes, edges) => {
  // Prepare nodes: only id, type, and essential data
  const preparedNodes = nodes.map(node => ({
    id: node.id,
    type: node.type,
    data: {
      nodeType: node.data?.nodeType || node.type,
      // Include any custom data fields that might be set
      ...(node.data || {})
    }
  }));

  // Prepare edges: only connection information
  const preparedEdges = edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle || null,
    targetHandle: edge.targetHandle || null
  }));

  return {
    nodes: preparedNodes,
    edges: preparedEdges
  };
};

/**
 * Send pipeline to backend API
 * 
 * @param {Object} payload - Pipeline payload
 * @param {string} endpoint - Backend API endpoint (default: '/api/pipeline')
 * @returns {Promise} API response
 */
export const submitPipeline = async (payload, endpoint = '/api/pipeline') => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Re-throw with more context
    throw new Error(`Failed to submit pipeline: ${error.message}`);
  }
};

