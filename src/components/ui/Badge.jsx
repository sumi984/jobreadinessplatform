import React from 'react';

const Badge = ({ status = 'neutral', children }) => {
    const styles = {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    };

    const variants = {
        neutral: {
            backgroundColor: '#E0E0E0',
            color: '#555',
        },
        progress: {
            backgroundColor: '#E3F2FD',
            color: '#1565C0',
        },
        success: {
            backgroundColor: '#E8F5E9',
            color: 'var(--color-success)',
        },
        warning: {
            backgroundColor: '#FFF8E1',
            color: 'var(--color-warning)',
        }
    };

    return (
        <span style={{ ...styles, ...variants[status] }}>
            {children}
        </span>
    );
};

export default Badge;
