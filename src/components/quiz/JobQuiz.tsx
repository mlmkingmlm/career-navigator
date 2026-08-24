import { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { quizQuestions } from '@/data/quizQuestions';

interface JobQuizProps {
    role: string;
    onComplete: (score: number) => void;
    onBack: () => void;
}

const JobQuiz = ({
    role,
    onComplete,
    onBack,
}: JobQuizProps) => {
    const questions = quizQuestions[role] ?? [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [error, setError] = useState('');

    const question = questions[currentQuestion];
    const selectedAnswer = question
        ? answers[question.id]
        : undefined;

    const progress = questions.length
        ? ((currentQuestion + 1) / questions.length) * 100
        : 0;

    const handleOptionSelect = (option: string) => {
        if (!question) return;

        setAnswers((previous) => ({
            ...previous,
            [question.id]: option,
        }));

        setError('');
    };

    const handlePrevious = () => {
        setError('');

        if (currentQuestion > 0) {
            setCurrentQuestion((previous) => previous - 1);
        } else {
            onBack();
        }
    };

    const handleNext = () => {
        if (!selectedAnswer) {
            setError('Please select an answer before continuing.');
            return;
        }

        setError('');

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((previous) => previous + 1);
        }
    };

    const handleSubmit = () => {
        const unansweredIndex = questions.findIndex(
            (item) => !answers[item.id]
        );

        if (unansweredIndex !== -1) {
            setCurrentQuestion(unansweredIndex);
            setError(
                `Please answer question ${unansweredIndex + 1} before submitting.`
            );
            return;
        }

        const score = questions.reduce((total, item) => {
            return total + (
                answers[item.id] === item.correctAnswer ? 1 : 0
            );
        }, 0);

        setError('');
        onComplete(score);
    };

    if (!questions.length) {
        return (
            <div className="w-full max-w-2xl mx-auto text-center py-8">
                <h2 className="text-xl font-semibold text-primary mb-2">
                    Quiz unavailable
                </h2>

                <p className="text-muted-foreground mb-6">
                    We couldn't find a quiz for this role yet.
                </p>

                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-primary font-medium hover:bg-muted transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Application
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <p className="text-sm font-medium text-secondary mb-1">
                    Job Application Quiz
                </p>

                <h2 className="text-2xl font-bold text-primary">
                    {role} Quiz
                </h2>

                <p className="text-muted-foreground mt-1">
                    Answer the questions to continue with your application.
                </p>
            </div>

            {/* Progress */}
            <div className="rounded-xl border border-border bg-muted/30 p-4 mb-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>

                    <span className="text-sm font-medium text-secondary">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div
                    className="h-2 rounded-full bg-muted overflow-hidden"
                    role="progressbar"
                    aria-valuenow={currentQuestion + 1}
                    aria-valuemin={1}
                    aria-valuemax={questions.length}
                    aria-label={`Question ${currentQuestion + 1} of ${questions.length}`}
                >
                    <div
                        className="h-full bg-secondary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="rounded-2xl border border-border bg-background p-5 md:p-6">
                <fieldset>
                    <legend className="text-lg md:text-xl font-semibold text-primary leading-relaxed mb-6">
                        {question.question}
                    </legend>

                    <div
                        className="space-y-3"
                        role="radiogroup"
                        aria-label={`Answers for question ${currentQuestion + 1}`}
                    >
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === option;

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`group w-full flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all ${isSelected
                                            ? 'border-secondary bg-secondary/10 shadow-sm'
                                            : 'border-border hover:border-secondary/50 hover:bg-muted/30'
                                        }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-semibold ${isSelected
                                                ? 'bg-secondary text-white border-secondary'
                                                : 'border-border text-muted-foreground group-hover:border-secondary/60'
                                            }`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </span>

                                    <span className="text-primary font-medium">
                                        {option}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </fieldset>

                {/* Error */}
                <div
                    role="alert"
                    aria-live="polite"
                    className="min-h-[24px] mt-4 text-sm text-destructive"
                >
                    {error}
                </div>

                {/* Navigation */}
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-4">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-primary font-medium hover:bg-muted transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {currentQuestion === 0
                            ? 'Back to Application'
                            : 'Previous'}
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Submit Quiz
                            <CheckCircle2 className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobQuiz;