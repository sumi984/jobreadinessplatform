import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navbar */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="text-2xl font-bold text-primary flex items-center gap-2">
                    <CheckCircle2 className="w-8 h-8" /> Placement Prep
                </div>
                <button
                    onClick={() => navigate('/app')}
                    className="bg-white text-primary border border-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-white to-gray-50">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Ace Your <span className="text-primary">Placement</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <button
                    onClick={() => navigate('/app')}
                    className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-focus transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                >
                    Get Started
                </button>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

                    <FeatureCard
                        icon={<Code className="w-8 h-8 text-primary" />}
                        title="Practice Problems"
                        description="Solve curated coding challenges to sharpen your skills."
                    />

                    <FeatureCard
                        icon={<Video className="w-8 h-8 text-primary" />}
                        title="Mock Interviews"
                        description="Simulate real interviews with AI-driven feedback."
                    />

                    <FeatureCard
                        icon={<BarChart3 className="w-8 h-8 text-primary" />}
                        title="Track Progress"
                        description="Visualize your growth and identify areas for improvement."
                    />

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 text-gray-400 py-8 text-center border-t border-gray-100">
                <p>© 2026 Placement Readiness Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all shadow-sm hover:shadow-md">
        <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm border border-gray-100">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
