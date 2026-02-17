import React from 'react';
import { LayoutDashboard, CheckCircle2 } from 'lucide-react';

const TopBar = ({ projectName, progress, status }) => {
    const styles = {
        height: '64px',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-3)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    };

    const projectStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '600',
        fontSize: '16px',
        color: 'var(--color-text)',
    };

    return (
        <div style={styles}>
            <div style={projectStyles}>
                <LayoutDashboard size={20} color="var(--color-accent)" />
                <span>{projectName}</span>
            </div>

            <div style={{ fontSize: '14px', color: '#666' }}>
                Step {progress.current} of {progress.total}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: status === 'Shipped' ? 'var(--color-success)' : '#ccc'
                }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{status}</span>
            </div>
        </div>
    );
};

export default TopBar;
