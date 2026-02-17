import React from 'react';

const Card = ({ children, className = '', title, actions, ...props }) => {
    const cardStyles = {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: 'var(--space-3)', // 24px
        marginBottom: 'var(--space-3)',
    };

    const headerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-2)',
    };

    return (
        <div style={cardStyles} className={className} {...props}>
            {(title || actions) && (
                <div style={headerStyles}>
                    {title && <h3 style={{ margin: 0, fontSize: '18px' }}>{title}</h3>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
