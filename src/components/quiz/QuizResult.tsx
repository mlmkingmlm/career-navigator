import { CheckCircle2 } from 'lucide-react';

interface QuizResultProps {
    score: number;
    totalQuestions: number;
    onFinish: () => void;
}

const QuizResult = ({
    score,
    totalQuestions,
    onFinish,
}: QuizResultProps) => {
    
    const percentage = totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;

    return (
        <div className="w-full max-w-2xl mx-auto text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8" />
            </div>

            <p className="text-sm font-medium text-secondary mb-1">
                Quiz Completed
            </p>

            <h2 className="text-2xl font-bold text-primary">
                Your Quiz Result
            </h2>

            <p className="text-muted-foreground mt-2">
                Here is your performance for this role.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-6">
                <p className="text-sm text-muted-foreground">
                    Your Score
                </p>

                <p className="text-4xl font-bold text-primary mt-1">
                    {score} / {totalQuestions}
                </p>

                <p className="text-lg font-semibold text-secondary mt-1">
                    {percentage}%
                </p>

                <p className="text-sm text-muted-foreground mt-3">
                    You answered {score} out of {totalQuestions} questions correctly.
                </p>
            </div>

            <button
                type="button"
                onClick={onFinish}
                className="w-full mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
                Submit Application
            </button>
        </div>
    );
};

export default QuizResult;