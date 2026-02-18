import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer
} from 'recharts';
import {
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Target,
    TrendingUp,
    Play
} from 'lucide-react';

const mockRadarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const CircularProgress = ({ value, size = 180, strokeWidth = 15 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const clampedValue = Math.min(100, Math.max(0, value));
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-indigo-600 transition-all duration-1000 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-gray-900">{clampedValue}/100</span>
                <span className="text-sm text-gray-500 font-medium">Readiness Score</span>
            </div>
        </div>
    );
};

export const Dashboard = () => {
    // -------------------------------------------------------------------------
    // VERIFICATION SETTINGS
    // Change these values to verify the UI logic
    // -------------------------------------------------------------------------
    const readinessScore = 72; // Try modifying this to 150 or -20 to test clamping

    const practiceProgress = {
        topic: 'Dynamic Programming',
        completed: 3,
        total: 10,
        isAllComplete: false // Set this to true to test "All topics completed" state
    };
    // -------------------------------------------------------------------------

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Track your progress and stay on target.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Overall Readiness */}
                <Card className="p-6 flex flex-col items-center justify-center shadow-lg border-indigo-100 bg-white">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-600" /> Overall Readiness
                    </h3>
                    {/* Pass a value > 100 or < 0 to test clamping */}
                    <CircularProgress value={readinessScore} />
                </Card>

                {/* Skill Breakdown (Radar Chart) */}
                <Card className="p-6 shadow-lg border-indigo-100 bg-white col-span-1 md:col-span-1 lg:col-span-2">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-600" /> Skill Breakdown
                        </h3>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockRadarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="#4f46e5"
                                    strokeWidth={2}
                                    fill="#6366f1"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Continue Practice */}
                <Card className="p-6 shadow-lg border-indigo-100 bg-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" /> Continue Practice
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">Pick up where you left off.</p>

                        {practiceProgress.isAllComplete ? (
                            <div className="bg-green-50 p-4 rounded-lg mb-4 text-center border border-green-100">
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-green-800">All topics completed!</p>
                                <p className="text-xs text-green-600 mt-1">Great job! You are ready for assessments.</p>
                            </div>
                        ) : (
                            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-left">
                                <p className="text-sm font-medium text-blue-800 mb-1">Topic: {practiceProgress.topic}</p>
                                <div className="flex justify-between text-xs text-blue-600 mb-2">
                                    <span>{practiceProgress.completed}/{practiceProgress.total} Completed</span>
                                    <span>{Math.round((practiceProgress.completed / practiceProgress.total) * 100)}%</span>
                                </div>
                                <Progress value={(practiceProgress.completed / practiceProgress.total) * 100} className="h-2 bg-blue-200" />
                            </div>
                        )}
                    </div>

                    {practiceProgress.isAllComplete ? (
                        <Button className="w-full justify-center gap-2" variant="outline">
                            <CheckCircle className="w-4 h-4" /> Review Topics
                        </Button>
                    ) : (
                        <Button className="w-full justify-center gap-2">
                            <Play className="w-4 h-4" /> Continue
                        </Button>
                    )}
                </Card>

                {/* Weekly Goals */}
                <Card className="p-6 shadow-lg border-indigo-100 bg-white">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" /> Weekly Goals
                    </h3>
                    <div className="mb-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium text-gray-600">Problems Solved</span>
                            <span className="text-2xl font-bold text-gray-900">12<span className="text-gray-400 text-base font-normal">/20</span></span>
                        </div>
                        <Progress value={60} className="h-3 bg-gray-100" />
                    </div>

                    <div className="flex justify-between pt-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${[true, true, true, false, false, false, false][i]
                                    ? 'bg-green-100 text-green-700 border-2 border-green-200'
                                    : 'bg-gray-50 text-gray-400 border border-gray-100'
                                    }`}>
                                    {day}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Upcoming Assessments */}
                <Card className="p-6 shadow-lg border-indigo-100 bg-white">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-600" /> Upcoming Assessments
                    </h3>
                    <div className="space-y-4">
                        {[
                            { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM', color: 'bg-orange-50 text-orange-700' },
                            { title: 'System Design Review', time: 'Wed, 2:00 PM', color: 'bg-purple-50 text-purple-700' },
                            { title: 'HR Interview Prep', time: 'Friday, 11:00 AM', color: 'bg-pink-50 text-pink-700' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className={`p-2 rounded-lg ${item.color}`}>
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};
