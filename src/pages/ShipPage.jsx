import React, { useEffect, useState } from 'react';
import { CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const CHECKLIST_KEY = 'prp_test_checklist';
const TOTAL_TESTS = 10;

const ShipPage = () => {
    const [islocked, setIsLocked] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const count = Object.values(parsed).filter(Boolean).length;
                if (count === TOTAL_TESTS) {
                    setIsLocked(false);
                }
            } catch (e) {
                console.error("Auth check failed", e);
            }
        }
    }, []);

    if (islocked) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center space-y-6 bg-white shadow-xl border-t-4 border-t-red-500">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Shipment Locked</h1>
                        <p className="text-gray-500 mt-2">
                            You cannot access the shipping page until all 10 verification tests are passed.
                        </p>
                    </div>
                    <Button
                        onClick={() => window.location.hash = "#/prp/07-test"}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go to Checklist
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 text-white">
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/50">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                </div>

                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">Ready to Ship! 🚀</h1>
                    <p className="text-xl text-indigo-200 max-w-lg mx-auto">
                        All systems operational. The Placement Readiness Platform is hardened, tested, and ready for deployment.
                    </p>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
                    <h3 className="text-lg font-semibold mb-2">Build Status: <span className="text-green-400">Stable</span></h3>
                    <p className="text-sm text-gray-300">
                        Version 1.3.0 • Company Intel Enabled • Strict Schema Enforced
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => window.location.hash = "#/"}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                    >
                        Back to Home
                    </Button>
                    <Button
                        onClick={() => window.location.hash = "#/prp/proof"}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-8"
                    >
                        Proceed to Final Submission
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShipPage;
