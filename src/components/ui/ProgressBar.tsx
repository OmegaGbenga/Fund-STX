import { twMerge } from "tailwind-merge";

export function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className={twMerge("w-full h-4 bg-white border-2 border-black rounded-lg overflow-hidden mt-3 shadow-[2px_2px_0px_0px_#000]", className)}>
            <div
                className="h-full bg-[var(--primary)] border-r-2 border-black transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}

