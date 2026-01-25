import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: {
            bg: "bg-[#D1FADF]", // Mint green
            icon: <CheckCircle className="w-5 h-5 text-green-700" />,
            border: "border-green-700"
        },
        error: {
            bg: "bg-[#FEE4E2]", // Light red
            icon: <AlertCircle className="w-5 h-5 text-red-700" />,
            border: "border-red-700"
        },
        info: {
            bg: "bg-[var(--tertiary)]", // Brand tertiary or white
            icon: <Info className="w-5 h-5 text-black" />,
            border: "border-black"
        }
    };

    const style = styles[type];

    return (
        <div className={twMerge(
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 min-w-[320px] max-w-[420px]",
            "border-2 shadow-[4px_4px_0px_0px_#000]",
            "animate-in slide-in-from-bottom-5 fade-in duration-300",
            style.bg,
            style.border || "border-black"
        )}>
            <div className="shrink-0">
                {style.icon}
            </div>
            <p className="flex-1 font-bold text-sm text-black">
                {message}
            </p>
            <button
                onClick={onClose}
                className="shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
            >
                <X className="w-4 h-4 text-black/70" />
            </button>
        </div>
    );
}
