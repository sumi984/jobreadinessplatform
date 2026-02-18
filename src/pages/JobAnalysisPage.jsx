import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJobDescription, saveAnalysis, getHistory } from '../lib/analyzer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Search, History, Sparkles, FileText, Briefcase, Building2, ArrowLeft } from 'lucide-react';

const JobAnalysisPage = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleAnalyze = () => {
        if (!jdText.trim()) return;

        const result = analyzeJobDescription(jdText, company, role);
        saveAnalysis(result);
        navigate(`/app/analysis/${result.id}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">JD Analyzer</h1>
                    <p className="text-gray-500 mt-1">Paste a job description to extract skills, get a roadmap, and assess readiness.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Input Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-lg border-indigo-100">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-white">
                            <CardTitle className="flex items-center gap-2 text-indigo-700">
                                <Sparkles className="w-5 h-5" /> New Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Building2 className="w-4 h-4" /> Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        placeholder="e.g. Google, Amazon"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" /> Job Role
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        placeholder="e.g. Frontend Engineer"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Job Description (JD)
                                </label>
                                <textarea
                                    className="w-full p-3 h-48 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-sm leading-relaxed"
                                    placeholder="Paste the full job description here..."
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-500 text-right">
                                    {jdText.length} characters
                                </p>
                            </div>

                            <div className="pt-2">
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={!jdText.trim()}
                                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                                >
                                    Analyze Job Description
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: History List */}
                <div className="lg:col-span-1">
                    <Card className="h-full border-gray-200 bg-gray-50/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-700">
                                <History className="w-5 h-5" /> Recent Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            {history.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    <p className="text-sm">No analysis history found.</p>
                                    <p className="text-xs mt-1">Start by analyzing a new JD!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {history.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => navigate(`/app/analysis/${item.id}`)}
                                            className="bg-white p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 truncate max-w-[150px]">
                                                    {item.role || 'Unknown Role'}
                                                </h4>
                                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${item.readinessScore >= 80 ? 'bg-green-100 text-green-700' :
                                                    item.readinessScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {item.readinessScore}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2 truncate">
                                                {item.company || 'Unknown Company'}
                                            </p>
                                            <div className="flex justify-between items-center text-[10px] text-gray-400">
                                                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1">
                                                    View <ArrowLeft className="w-3 h-3 rotate-180" />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobAnalysisPage;
