import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import Button from '../ui/Button';

const ProofFooter = () => {
    const [checks, setChecks] = useState({
        uiLimit: false,
        logicWorking: false,
        testPassed: false,
        deployed: false,
    });

    const toggleCheck = (key) => {
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const styles = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-2) var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.02)',
    };

    const checkboxGroupStyles = {
        display: 'flex',
        gap: 'var(--space-4)',
    };

    const checkboxStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '14px',
        fontWeight: '500',
    };

    return (
        <div style={styles}>
            <div style={checkboxGroupStyles}>
                {Object.entries(checks).map(([key, checked]) => (
                    <div
                        key={key}
                        style={checkboxStyles}
                        onClick={() => toggleCheck(key)}
                    >
                        {checked ? (
                            <CheckSquare size={18} color="var(--color-success)" />
                        ) : (
                            <Square size={18} color="#ccc" />
                        )}
                        <span style={{ color: checked ? 'var(--color-text)' : '#888' }}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                    </div>
                ))}
            </div>
            <div>
                <span style={{ fontSize: '13px', color: '#888', marginRight: '12px' }}>
                    All checks required to proceed
                </span>
                <Button variant={Object.values(checks).every(Boolean) ? 'primary' : 'secondary'} disabled={!Object.values(checks).every(Boolean)}>
                    Confirm Completion
                </Button>
            </div>
        </div>
    );
};

export default ProofFooter;
