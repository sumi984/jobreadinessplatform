import React from 'react';

const ContextHeader = ({ title, description }) => {
    const styles = {
        padding: 'var(--space-4) 0',
        backgroundColor: 'var(--color-bg)',
    };

    return (
        <div style={styles}>
            <h1 style={{ marginBottom: '8px' }}>{title}</h1>
            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6' }}>
                {description}
            </p>
        </div>
    );
};

export default ContextHeader;
