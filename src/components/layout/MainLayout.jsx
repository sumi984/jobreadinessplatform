import React from 'react';
import TopBar from './TopBar';
import ProofFooter from './ProofFooter';

const MainLayout = ({ children }) => {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingBottom: '80px', // Space for footer
    };

    const mainStyles = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        width: '100%',
        padding: '0 var(--space-3)',
    };

    return (
        <div style={styles}>
            <TopBar
                projectName="KodNest Premium Build"
                progress={{ current: 1, total: 5 }}
                status="In Progress"
            />
            <main style={mainStyles}>
                {children}
            </main>
            <ProofFooter />
        </div>
    );
};

export default MainLayout;
