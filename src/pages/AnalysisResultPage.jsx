import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById } from '../lib/analyzer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { ArrowLeft, CheckCircle2, Calendar, ClipboardList, BrainCircuit, Target } from 'lucide-react';

const AnalysisResultPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            const result = getAnalysisById(id);
            if (result) {
                setData(result);
            } else {
                navigate('/app/analysis'); // Redirect if not found
            }
        }
    }, [id, navigate]);

    if (!data) return <div className="p-10 text-center">Loading analysis...</div>;

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/app/analysis')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analysis Result</h1>
                    <p className="text-gray-500">{data.role} at {data.company}</p>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <Card className="col-span-1 border-t-4 border-t-indigo-500 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-500" /> Readiness Potential
                        </CardTitle>
                        <CardDescription>Based on JD match & completeness</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6">
                        <div className={`text-6xl font-bold ${getScoreColor(data.readinessScore)}`}>
                            {data.readinessScore}
                        </div>
                        <span className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">Score / 100</span>
                    </CardContent>
                </Card>

                {/* Skills Detected */}
                <Card className="col-span-1 md:col-span-2 border-t-4 border-t-emerald-500 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-emerald-500" /> Detected Key Skills
                        </CardTitle>
                        <CardDescription>Technology stack extracted from the job description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(data.extractedSkills).length === 0 ? (
                            <p className="text-gray-500 italic">No specific technical skills found suitable for auto-extraction.</p>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(data.extractedSkills).map(([category, skills]) => (
                                    <div key={category}>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">{category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, idx) => (
                                                <Badge key={idx} className="bg-emerald-50 text-emerald-700 border-none px-3 py-1 text-sm font-medium">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

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
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-purple-600" /> Round-wise Checklist
                        </h2>
                        <div className="space-y-3">
                            {Object.entries(data.checklist).map(([round, items], idx) => (
                                <Card key={idx} className="overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-2 border-b font-semibold text-gray-700 text-sm">
                                        {round}
                                    </div>
                                    <div className="p-3">
                                        <ul className="space-y-2">
                                            {items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <div className="min-w-[16px] mt-0.5 w-4 h-4 rounded border border-gray-300" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            ))}
                        </div>
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
