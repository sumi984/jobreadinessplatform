import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckSquare, AlertTriangle, RotateCcw, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

const TEST_ITEMS = [
    { id: 'jd-validation', label: 'JD required validation works', hint: 'Try empty JD -> Verify blocked' },
    { id: 'short-jd-warning', label: 'Short JD warning shows for <200 chars', hint: 'Paste <200 chars -> Verify alert' },
    { id: 'skills-grouping', label: 'Skills extraction groups correctly', hint: 'Check if React goes to "Web"' },
    { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Enterprise vs Startup analysis' },
    { id: 'score-calc', label: 'Score calculation is deterministic', hint: 'Same JD should get same base score' },
    { id: 'skill-toggles', label: 'Skill toggles update score live', hint: 'Toggle "Know" -> Score +2' },
    { id: 'persist-refresh', label: 'Changes persist after refresh', hint: 'Toggle skill, refresh, check persistence' },
    { id: 'history-saves', label: 'History saves and loads correctly', hint: 'Check sidebar history list' },
    { id: 'exports-work', label: 'Export buttons copy the correct content', hint: 'Try Copy Plan/Checklist' },
    { id: 'no-console-errors', label: 'No console errors on core pages', hint: 'Inspect Element > Console' },
];

const CHECKLIST_KEY = 'prp_test_checklist';

const TestChecklistPage = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [passedCount, setPassedCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setCheckedItems(parsed);
                setPassedCount(Object.values(parsed).filter(Boolean).length);
            } catch (e) {
                console.error("Failed to load checklist", e);
            }
        }
    }, []);

    const handleToggle = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);

        const count = Object.values(newChecked).filter(Boolean).length;
        setPassedCount(count);

        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(newChecked));
    };

    const handleReset = () => {
        if (window.confirm("Reset all test progress?")) {
            setCheckedItems({});
            setPassedCount(0);
            localStorage.removeItem(CHECKLIST_KEY);
        }
    };

    const isComplete = passedCount === TEST_ITEMS.length;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl w-full space-y-8">

                {/* Header Summary */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Pre-Ship Checklist</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Verify all features before unlocking the ship page.
                    </p>

                    <div className={cn(
                        "mt-6 p-4 rounded-lg flex items-center justify-center gap-3 border shadow-sm",
                        isComplete ? "bg-green-50 border-green-200 text-green-800" : "bg-orange-50 border-orange-200 text-orange-800"
                    )}>
                        {isComplete ? (
                            <>
                                <CheckSquare className="w-6 h-6" />
                                <span className="font-bold text-lg">Ready to Ship! (10/10)</span>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="w-6 h-6" />
                                <span className="font-bold text-lg">Tests Passed: {passedCount} / 10</span>
                                <span className="text-sm font-normal opacity-80 ml-2">(Fix issues before shipping)</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Checklist Card */}
                <Card className="shadow-lg border-indigo-100">
                    <CardHeader className="border-b border-gray-100 bg-white/50 pb-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl text-gray-800">Verification Steps</CardTitle>
                            <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-400 hover:text-red-500 hover:bg-red-50">
                                <RotateCcw className="w-4 h-4 mr-2" /> Reset
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="divide-y divide-gray-100">
                            {TEST_ITEMS.map((item) => (
                                <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        checked={!!checkedItems[item.id]}
                                        onChange={() => handleToggle(item.id)}
                                        className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <label htmlFor={item.id} className="flex-1 cursor-pointer select-none">
                                        <div className={cn("font-medium text-gray-900", checkedItems[item.id] && "line-through text-gray-400")}>
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-indigo-500 mt-1 font-mono bg-indigo-50 inline-block px-2 py-0.5 rounded">
                                            Hint: {item.hint}
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Footer Link */}
                <div className="text-center">
                    <a href="/#/prp/08-ship" className={cn(
                        "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white transition-all",
                        isComplete
                            ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
                            : "bg-gray-300 cursor-not-allowed"
                    )}>
                        <Lock className={cn("w-4 h-4 mr-2", isComplete && "hidden")} />
                        {isComplete ? "Go to Ship Page 🚀" : "Ship Page Locked"}
                    </a>
                </div>

            </div>
        </div>
    );
};

export default TestChecklistPage;
