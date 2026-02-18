import React from 'react';
import { cn } from '../../lib/utils';

export const Progress = ({ value, max = 100, className }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn("relative w-full overflow-hidden rounded-full bg-slate-100", className)}>
            <div
                className="h-full w-full flex-1 bg-indigo-600 transition-all"
                style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
        </div>
    );
};
