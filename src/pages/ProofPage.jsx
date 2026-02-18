import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Check, Copy, ExternalLink, Package, Rocket, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

// PROJECT STEPS (The "8 Steps" roughly corresponding to module implementation)
const PROJECT_STEPS = [
    { id: 'landing', label: '1. Landing Page UI' },
    { id: 'dashboard', label: '2. Student Dashboard' },
    { id: 'practice', label: '3. Practice Module' },
    { id: 'analyzer', label: '4. JD Analyzer Logic' },
    { id: 'interactive', label: '5. Interactive Results' },
    { id: 'intel', label: '6. Company Intel Engine' },
    { id: 'hardening', label: '7. Reliability Hardening' },
    { id: 'checklist', label: '8. Test Checklist & Guard' },
];

const SUBMISSION_KEY = 'prp_final_submission';
const CHECKLIST_KEY = 'prp_test_checklist';

const ProofPage = () => {
    // State
    const [steps, setSteps] = useState({});
    const [urls, setUrls] = useState({ lovable: '', github: '', deployed: '' });
    const [checklistPassed, setChecklistPassed] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    // Load Data
    useEffect(() => {
        // Load Steps & URLs
        const saved = localStorage.getItem(SUBMISSION_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSteps(parsed.steps || {});
                setUrls(parsed.urls || { lovable: '', github: '', deployed: '' });
            } catch (e) { console.error(e); }
        }

        // Load Checklist Status (Read-Only here)
        const ChecklistSaved = localStorage.getItem(CHECKLIST_KEY);
        if (ChecklistSaved) {
            try {
                const parsed = JSON.parse(ChecklistSaved);
                const count = Object.values(parsed).filter(Boolean).length;
                if (count >= 10) setChecklistPassed(true);
            } catch (e) { console.error(e); }
        }
    }, []);

    // Save Data
    useEffect(() => {
        const data = { steps, urls };
        localStorage.setItem(SUBMISSION_KEY, JSON.stringify(data));

        // Check Shipped Status
        const allStepsDone = PROJECT_STEPS.every(s => steps[s.id]);
        const allUrlsValid = Object.values(urls).every(u => u && (u.startsWith('http://') || u.startsWith('https://')));

        setIsShipped(allStepsDone && checklistPassed && allUrlsValid);
    }, [steps, urls, checklistPassed]);

    // Handlers
    const toggleStep = (id) => {
        setSteps(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleUrlChange = (field, value) => {
        setUrls(prev => ({ ...prev, [field]: value }));
    };

    const copyFinalSubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${urls.lovable}
GitHub Repository: ${urls.github}
Live Deployment: ${urls.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
        `.trim();
        navigator.clipboard.writeText(text);
        alert("Submission copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-900">Proof of Work</h1>
                    <div className="flex justify-center">
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm transition-all",
                            isShipped
                                ? "bg-green-100 text-green-800 ring-2 ring-green-500 ring-offset-2"
                                : "bg-gray-200 text-gray-600"
                        )}>
                            Status: {isShipped ? "Shipped 🚀" : "In Progress 🚧"}
                        </span>
                    </div>
                </div>

                {/* Shipped Celebration Message */}
                {isShipped && (
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">You built a real product.</h2>
                                <p className="text-indigo-100 max-w-xl">
                                    Not a tutorial. Not a clone. A structured tool that solves a real problem.
                                    This is your proof of work.
                                </p>
                            </div>
                            <Button
                                onClick={copyFinalSubmission}
                                variant="secondary"
                                className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold shadow-lg whitespace-nowrap"
                            >
                                <Copy className="w-4 h-4 mr-2" /> Copy Final Submission
                            </Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* A) Step Completion Overview */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-indigo-600" /> Step Completion Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {PROJECT_STEPS.map(step => (
                                    <div key={step.id}
                                        onClick={() => toggleStep(step.id)}
                                        className={cn(
                                            "flex items-center p-3 rounded-lg border cursor-pointer transition-all",
                                            steps[step.id] ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-indigo-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border flex items-center justify-center mr-3",
                                            steps[step.id] ? "bg-green-500 border-green-500" : "border-gray-300"
                                        )}>
                                            {steps[step.id] && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={cn("text-sm font-medium", steps[step.id] ? "text-green-800" : "text-gray-700")}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Checklist Status Indicator */}
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Testing Checklist (via /prp/07-test)</span>
                                    <span className={cn("font-bold", checklistPassed ? "text-green-600" : "text-orange-500")}>
                                        {checklistPassed ? "Passed (10/10)" : "Pending"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* B) Artifact Inputs */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-purple-600" /> Project Artifacts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Lovable Project Link</label>
                                <input
                                    type="url"
                                    placeholder="https://lovable.dev/..."
                                    value={urls.lovable}
                                    onChange={(e) => handleUrlChange('lovable', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">GitHub Repository Link</label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    value={urls.github}
                                    onChange={(e) => handleUrlChange('github', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Deployed URL</label>
                                <input
                                    type="url"
                                    placeholder="https://my-app.vercel.app"
                                    value={urls.deployed}
                                    onChange={(e) => handleUrlChange('deployed', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                                />
                            </div>

                            {(!urls.lovable || !urls.github || !urls.deployed) && (
                                <div className="bg-orange-50 text-orange-700 p-3 rounded text-xs flex gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>All 3 links are required for "Shipped" status.</span>
                                </div>
                            )}

                            {!isShipped && (
                                <div className="pt-4">
                                    <Button
                                        disabled={true}
                                        variant="outline"
                                        className="w-full text-gray-400 cursor-not-allowed"
                                    >
                                        Complete all steps & fields to enable export
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default ProofPage;
