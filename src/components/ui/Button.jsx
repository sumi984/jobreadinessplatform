import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: 'white',
      border: '1px solid var(--color-accent)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
    },
    ghost: {
        backgroundColor: 'transparent',
        color: 'var(--color-text)',
        border: 'none',
        padding: '8px 16px',
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...variants[variant] }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
