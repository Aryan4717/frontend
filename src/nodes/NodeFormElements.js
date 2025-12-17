// NodeFormElements.js
// Styled form elements for consistent node UI

import { designTokens } from '../designSystem';

export const NodeLabel = ({ children, htmlFor, required }) => {
  const labelStyle = {
    display: 'block',
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.medium,
    color: designTokens.colors.textSecondary,
    marginBottom: designTokens.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <label htmlFor={htmlFor} style={labelStyle}>
      {children}
      {required && <span style={{ color: designTokens.colors.error, marginLeft: '2px' }}>*</span>}
    </label>
  );
};

export const NodeInput = ({ type = 'text', value, onChange, placeholder, id, ...props }) => {
  const inputStyle = {
    width: '100%',
    padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.textPrimary,
    backgroundColor: designTokens.colors.bgPrimary,
    border: `1px solid ${designTokens.colors.nodeBorder}`,
    borderRadius: designTokens.borderRadius.md,
    outline: 'none',
    transition: `all ${designTokens.transitions.fast}`,
    fontFamily: designTokens.typography.fontFamily,
    boxSizing: 'border-box',
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={(e) => {
        e.target.style.borderColor = designTokens.colors.primary;
        e.target.style.boxShadow = `0 0 0 3px ${designTokens.colors.primaryLight}`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = designTokens.colors.nodeBorder;
        e.target.style.boxShadow = 'none';
      }}
      {...props}
    />
  );
};

export const NodeSelect = ({ value, onChange, children, id, ...props }) => {
  const selectStyle = {
    width: '100%',
    padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.textPrimary,
    backgroundColor: designTokens.colors.bgPrimary,
    border: `1px solid ${designTokens.colors.nodeBorder}`,
    borderRadius: designTokens.borderRadius.md,
    outline: 'none',
    transition: `all ${designTokens.transitions.fast}`,
    fontFamily: designTokens.typography.fontFamily,
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      style={selectStyle}
      onFocus={(e) => {
        e.target.style.borderColor = designTokens.colors.primary;
        e.target.style.boxShadow = `0 0 0 3px ${designTokens.colors.primaryLight}`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = designTokens.colors.nodeBorder;
        e.target.style.boxShadow = 'none';
      }}
      {...props}
    >
      {children}
    </select>
  );
};

export const NodeFormGroup = ({ children, style = {} }) => {
  const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: designTokens.spacing.xs,
    ...style
  };

  return <div style={groupStyle}>{children}</div>;
};

