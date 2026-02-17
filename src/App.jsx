import React from 'react';
import MainLayout from './components/layout/MainLayout';
import ContextHeader from './components/layout/ContextHeader';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Badge from './components/ui/Badge';
import { Copy, Terminal, AlertTriangle, CheckCircle } from 'lucide-react';

function App() {
  const workspaceStyles = {
    display: 'flex',
    gap: 'var(--space-4)',
    alignItems: 'flex-start',
    paddingBottom: 'var(--space-5)',
  };

  const primaryColStyles = {
    flex: '1',
    minWidth: 0, // Fix flex overflow
  };

  const secondaryColStyles = {
    flex: '0 0 320px', // Fixed width for sidebar
    position: 'sticky',
    top: '80px',
  };

  return (
    <MainLayout>
      <ContextHeader
        title="Design System Demo"
        description="This is the KodNest Premium Build System. It represents a strict, coherent, and premium B2C aesthetic. No noise, just focus."
      />

      <div style={workspaceStyles}>
        {/* Primary Workspace (70% approx) */}
        <div style={primaryColStyles}>
          <Card title="Primary Workspace">
            <p style={{ marginBottom: '16px' }}>
              The primary workspace contains the main interaction elements. It uses 70% of the available width.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </Card>

          <Card title="Typography Scale">
            <h1>Heading 1 (32px)</h1>
            <h2>Heading 2 (24px)</h2>
            <h3>Heading 3 (20px)</h3>
            <p>Body text (16px). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </Card>

          <Card title="Input Fields">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp Redesign"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'inherit',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
                <textarea
                  rows="3"
                  placeholder="Brief detailed description..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'inherit',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Panel (30% approx) */}
        <div style={secondaryColStyles}>
          <Card>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600' }}>Step 1: Context</h3>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
              Define the core parameters of your project before proceeding to the build phase.
            </p>

            <div style={{
              backgroundColor: '#f4f4f4',
              padding: '12px',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '13px',
              marginBottom: '16px',
              border: '1px solid #e0e0e0',
              color: '#333'
            }}>
              {'>'} Generating design tokens...
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Copy size={16} /> Copy Prompt
              </Button>
              <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Terminal size={16} /> Build in Lovable
              </Button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <Button variant="ghost" style={{ flex: 1, padding: '8px', justifyContent: 'center' }}>
                <CheckCircle size={16} color="var(--color-success)" /> It Worked
              </Button>
              <Button variant="ghost" style={{ flex: 1, padding: '8px', justifyContent: 'center' }}>
                <AlertTriangle size={16} color="var(--color-warning)" /> Error
              </Button>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888' }}>
              Status
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge status="neutral">Not Started</Badge>
              <Badge status="progress">In Progress</Badge>
              <Badge status="success">Shipped</Badge>
              <Badge status="warning">Blocked</Badge>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
