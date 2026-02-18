import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById, updateAnalysis } from '../lib/analyzer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { ArrowLeft, CheckCircle2, Calendar, ClipboardList, BrainCircuit, Target, Download, Copy, PlayCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const AnalysisResultPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [skillState, setSkillState] = useState({}); // { skill: 'know' | 'practice' }

    useEffect(() => {
        if (id) {
            const result = getAnalysisById(id);
            if (result) {
                setData(result);
                setSkillState(result.skillConfidenceMap || {});
            } else {
                navigate('/app/analysis'); // Redirect if not found
            }
        }
    }, [id, navigate]);

    // Handle Skill Toggle
    const toggleSkill = (skill) => {
        setSkillState(prev => {
            const newState = { ...prev };
            // Default is 'practice' (implied if not set), so toggle to 'know', or back to 'practice'
            if (newState[skill] === 'know') {
                newState[skill] = 'practice';
            } else {
                newState[skill] = 'know';
            }
            return newState;
        });
    };

    // Calculate Live Score
    const calculateLiveScore = useCallback(() => {
        if (!data) return 0;
        let score = data.baseScore || data.readinessScore; // Start with base

        Object.values(skillState).forEach(status => {
            if (status === 'know') score += 2;
            if (status === 'practice') score -= 2;
        });

        return Math.min(100, Math.max(0, score));
    }, [data, skillState]);

    const liveScore = calculateLiveScore();

    // Persist Changes (Debounced ideally, but simple effect here works for local updates)
    useEffect(() => {
        if (data && id) {
            const score = calculateLiveScore();
            updateAnalysis(id, {
                skillConfidenceMap: skillState,
                readinessScore: score
            });
        }
    }, [skillState, calculateLiveScore, id, data]);


    // Helper to get weak skills for Action box
    const getWeakSkills = () => {
        if (!data) return [];
        const allSkills = Object.values(data.extractedSkills).flat();
        // Skills explicitly marked practice OR not marked yet (default)
        return allSkills.filter(s => skillState[s] !== 'know').slice(0, 3);
    };

    // Export Handlers
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied to clipboard!`);
    };

    const handleDownload = () => {
        const text = `
JOB ANALYSIS REPORT
Role: ${data.role}
Company: ${data.company}
Readiness Score: ${liveScore}/100
Date: ${new Date().toLocaleDateString()}

--- 7-DAY PLAN ---
${data.plan.map(d => `${d.day}: ${d.title}\n${d.tasks.map(t => ` - ${t}`).join('\n')}`).join('\n\n')}

--- CHECKLIST ---
${Object.entries(data.checklist).map(([r, items]) => `${r}:\n${items.map(i => ` - ${i}`).join('\n')}`).join('\n\n')}

--- QUESTIONS ---
${data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
        `;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Analysis_${data.company}_${data.role}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    if (!data) return <div className="p-10 text-center">Loading analysis...</div>;

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header & Export Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/app/analysis')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analysis Result</h1>
                        <p className="text-gray-500">{data.role} at {data.company}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                        data.plan.map(d => `${d.day}: ${d.tasks.join(', ')}`).join('\n'), "7-Day Plan"
                    )}>
                        <Copy className="w-4 h-4 mr-2" /> Plan
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                        Object.entries(data.checklist).map(([r, items]) => `${r}:\n${items.map(i => ` - ${i}`).join('\n')}`).join('\n\n'), "Checklist"
                    )}>
                        <Copy className="w-4 h-4 mr-2" /> Checklist
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(data.questions.join('\n'), "Questions")}>
                        <Copy className="w-4 h-4 mr-2" /> Questions
                    </Button>
                    <Button variant="default" size="sm" onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-700">
                        <Download className="w-4 h-4 mr-2" /> Download Report
                    </Button>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <Card className="col-span-1 border-t-4 border-t-indigo-500 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-500" /> Live Readiness
                        </CardTitle>
                        <CardDescription>Updates as you toggle skills</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6">
                        <div className={`text-6xl font-bold transition-all duration-300 ${getScoreColor(liveScore)}`}>
                            {liveScore}
                        </div>
                        <span className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">Score / 100</span>
                    </CardContent>
                </Card>

                {/* Skills Interactive */}
                <Card className="col-span-1 md:col-span-2 border-t-4 border-t-emerald-500 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-emerald-500" /> Key Skills (Interactive)
                        </CardTitle>
                        <CardDescription>Click tags to mark as <strong>Know</strong> (Green) or <strong>Need Practice</strong> (Gray). Score updates automatically.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(data.extractedSkills).length === 0 ? (
                            <p className="text-gray-500 italic">No specific technical skills found.</p>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(data.extractedSkills).map(([category, skills]) => (
                                    <div key={category}>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">{category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, idx) => {
                                                const isKnown = skillState[skill] === 'know';
                                                return (
                                                    <Badge
                                                        key={idx}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={cn(
                                                            "cursor-pointer px-3 py-1 text-sm font-medium transition-all select-none border",
                                                            isKnown
                                                                ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                                                        )}
                                                    >
                                                        {isKnown ? <CheckCircle2 className="w-3 h-3 mr-1" /> : null}
                                                        {skill}
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Action Box */}
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-none shadow-lg">
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <PlayCircle className="w-6 h-6" /> Recommended Next Action
                        </h3>
                        <p className="text-blue-100 mb-1">
                            Focus on your weak areas: <strong>{getWeakSkills().join(', ') || 'General Review'}</strong>.
                        </p>
                    </div>
                    <Button variant="secondary" className="whitespace-nowrap font-bold text-indigo-700 hover:bg-blue-50">
                        Start Day 1 Plan
                    </Button>
                </div>
            </Card>

            {/* Preparation Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 7-Day Plan */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-600" /> 7-Day Strategy Plan
                    </h2>
                    <div className="space-y-4">
                        {data.plan.map((day, idx) => (
                            <Card key={idx} className="bg-white border-l-4 border-l-blue-400">
                                <CardHeader className="py-3 px-4 pb-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{day.day}</span>
                                    </div>
                                    <CardTitle className="text-lg">{day.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-2 px-4 pb-4">
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {day.tasks.map((task, tIdx) => (
                                            <li key={tIdx}>{task}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Round Checklist & Questions */}
                <div className="space-y-8">
                    {/* Checklist */}
                    {/* Round Rounds Timeline */}
                    <div className="space-y-8">
                        {/* Company Intel Card */}
                        <Card className={cn(
                            "border-l-4 shadow-sm",
                            data.companyIntel?.size === 'Enterprise' ? "border-l-blue-600 bg-blue-50/50" : "border-l-orange-500 bg-orange-50/50"
                        )}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {data.companyIntel?.size === 'Enterprise' ? <Target className="w-5 h-5 text-blue-600" /> : <BrainCircuit className="w-5 h-5 text-orange-500" />}
                                    Company Intel
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Industry:</span>
                                        <span className="font-medium text-gray-900">{data.companyIntel?.industry || 'Technology'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Size Category:</span>
                                        <Badge variant="outline" className={data.companyIntel?.size === 'Enterprise' ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}>
                                            {data.companyIntel?.size || 'Unknown'}
                                        </Badge>
                                    </div>
                                    <div className="bg-white/60 p-3 rounded-md text-sm text-gray-700 italic border border-gray-100">
                                        "{data.companyIntel?.focus}"
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Smart Rounds Timeline */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-purple-600" /> Interview Rounds
                            </h2>

                            <div className="relative pl-6 border-l-2 border-gray-200 space-y-8">
                                {/* Fallback to old checklist if smartRounds missing (for old history items) */}
                                {(data.smartRounds || []).map((round, idx) => (
                                    <div key={idx} className="relative">
                                        <span className="absolute -left-[33px] top-0 bg-white border-2 border-purple-600 w-4 h-4 rounded-full"></span>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                            <h3 className="font-bold text-gray-900 mb-1">{round.title}</h3>
                                            <p className="text-xs text-purple-600 font-medium mb-3 uppercase tracking-wider">
                                                Why: {round.why}
                                            </p>
                                            <ul className="space-y-2">
                                                {round.details.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <div className="min-w-[4px] mt-1.5 w-1 h-1 rounded-full bg-gray-400" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}

                                {/* DEMO MODE DISCLAIMER */}
                                <div className="pt-4 text-center">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
                                        Demo Mode: Company intel generated heuristically.
                                    </span>
                                </div>
                            </div>

                            {/* Fallback for old history items without smartRounds */}
                            {!data.smartRounds && (
                                <div className="text-gray-500 text-sm italic">
                                    Use a new analysis to see the upgraded Round Mapping engine.
                                </div>
                            )}
                        </div>

                        {/* Questions */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <ClipboardList className="w-6 h-6 text-orange-600" /> Likely Interview Questions
                            </h2>
                            <Card>
                                <CardContent className="p-0">
                                    <ul className="divide-y divide-gray-100">
                                        {data.questions.map((q, idx) => (
                                            <li key={idx} className="p-4 flex gap-3 hover:bg-gray-50 transition-colors">
                                                <span className="text-orange-500 font-bold text-sm">Q{idx + 1}.</span>
                                                <span className="text-gray-700 text-sm font-medium">{q}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            );
};

            export default AnalysisResultPage;
