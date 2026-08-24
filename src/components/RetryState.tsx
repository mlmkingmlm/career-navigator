import { WifiOff, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface RetryStateProps {
    onRetry?: () => void | Promise<void>;
    message?: string;
}

const RetryState = ({
    onRetry,
    message = "Unable to load this page.",
}: RetryStateProps) => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [retrying, setRetrying] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const handleRetry = async () => {
        if (!navigator.onLine) {
            setIsOffline(true);
            return;
        }

        try {
            setRetrying(true);
            await onRetry?.();
        } finally {
            setRetrying(false);
        }
    };

    return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
            <div className="flex flex-col items-center text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-5">
                    {isOffline ? (
                        <WifiOff className="w-8 h-8 text-muted-foreground" />
                    ) : (
                        <AlertCircle className="w-8 h-8 text-muted-foreground" />
                    )}
                </div>

                <h2 className="text-xl font-semibold text-foreground">
                    {isOffline ? "You're offline" : "Something went wrong"}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    {isOffline
                        ? "Please check your internet connection and try again."
                        : message}
                </p>

                <button
                    type="button"
                    onClick={handleRetry}
                    disabled={retrying || isOffline}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RefreshCw
                        className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`}
                    />

                    {retrying ? "Retrying..." : "Retry"}
                </button>
            </div>
        </div>
    );
};

export default RetryState;