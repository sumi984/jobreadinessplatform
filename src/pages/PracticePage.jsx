import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Circle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

// Mock Data
const problems = [
    { id: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', status: 'Solved' },
    { id: 2, title: 'Add Two Numbers', topic: 'Linked List', difficulty: 'Medium', status: 'Unsolved' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', topic: 'Strings', difficulty: 'Medium', status: 'Unsolved' },
    { id: 4, title: 'Median of Two Sorted Arrays', topic: 'Arrays', difficulty: 'Hard', status: 'Unsolved' },
    { id: 5, title: 'Longest Palindromic Substring', topic: 'DP', difficulty: 'Medium', status: 'Solved' },
    { id: 6, title: 'Zigzag Conversion', topic: 'Strings', difficulty: 'Medium', status: 'Unsolved' },
    { id: 7, title: 'Reverse Integer', topic: 'Math', difficulty: 'Medium', status: 'Solved' },
    { id: 8, title: 'String to Integer (atoi)', topic: 'Strings', difficulty: 'Medium', status: 'Unsolved' },
    { id: 9, title: 'Palindrome Number', topic: 'Math', difficulty: 'Easy', status: 'Solved' },
    { id: 10, title: 'Regular Expression Matching', topic: 'DP', difficulty: 'Hard', status: 'Unsolved' },
    { id: 11, title: 'Container With Most Water', topic: 'Arrays', difficulty: 'Medium', status: 'Solved' },
    { id: 12, title: 'Integer to Roman', topic: 'Math', difficulty: 'Medium', status: 'Unsolved' },
];

const topics = ['All', 'Arrays', 'Strings', 'DP', 'Math', 'Linked List'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

const PracticePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');

    const filteredProblems = problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTopic = selectedTopic === 'All' || problem.topic === selectedTopic;
        const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
        return matchesSearch && matchesTopic && matchesDifficulty;
    });

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case 'Easy': return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            case 'Hard': return 'bg-red-100 text-red-800 hover:bg-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Practice Problems</h1>
                    <p className="text-gray-500">Sharpen your skills with our curated list of problems.</p>
                </div>
            </div>

            {/* Filters and Search */}
            <Card className="p-4 bg-white">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <div className="flex items-center gap-2 border-r pr-4 mr-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Filters:</span>
                        </div>

                        <select
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                        >
                            {topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
                        </select>

                        <select
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                        >
                            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Problem List */}
            <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProblems.map((problem) => (
                            <tr key={problem.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {problem.status === 'Solved' ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-300" />
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                        {problem.topic}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge className={getDifficultyColor(problem.difficulty)} variant="secondary">
                                        {problem.difficulty}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                        Solve
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProblems.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No problems found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticePage;
