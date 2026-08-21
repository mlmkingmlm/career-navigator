import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/contexts/UserContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/DashboardNavbar";

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question:
            "Which language is primarily used to build interactive web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correctAnswer: "JavaScript",
    },
    {
        id: 2,
        question: "Which React hook is commonly used to manage component state?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        correctAnswer: "useState",
    },
    {
        id: 3,
        question: "Which HTTP method is commonly used to retrieve data?",
        options: ["POST", "PUT", "GET", "DELETE"],
        correctAnswer: "GET",
    },
    {
        id: 4,
        question: "Which technology is commonly used as a NoSQL database?",
        options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
        correctAnswer: "MongoDB",
    },
    {
        id: 5,
        question: "What does CSS primarily control?",
        options: [
            "Database queries",
            "Page styling and layout",
            "Server authentication",
            "API requests",
        ],
        correctAnswer: "Page styling and layout",
    },
    {
        id: 6,
        question: "Which JavaScript method creates a new array by transforming every element?",
        options: ["filter()", "map()", "reduce()", "find()"],
        correctAnswer: "map()",
    },
    {
        id: 7,
        question: "Which React hook is used to perform side effects in a component?",
        options: ["useState", "useMemo", "useEffect", "useCallback"],
        correctAnswer: "useEffect",
    },
    {
        id: 8,
        question: "Which HTTP status code indicates that a resource was successfully created?",
        options: ["200", "201", "400", "404"],
        correctAnswer: "201",
    },
    {
        id: 9,
        question: "Which MongoDB operation is commonly used to retrieve documents?",
        options: ["find()", "insertOne()", "updateOne()", "deleteOne()"],
        correctAnswer: "find()",
    },
    {
        id: 10,
        question: "Which CSS property is used to control the space inside an element's border?",
        options: ["margin", "padding", "gap", "spacing"],
        correctAnswer: "padding",
    },
];

const Quiz = () => {
    const { userProfile, isLoading } = useUser();
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Protect dashboard quiz route
    useEffect(() => {
        if (!isLoading && !userProfile) {
            navigate("/");
        }
    }, [userProfile, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
                />
            </div>
        );
    }

    if (!userProfile) return null;

    const question = quizQuestions[currentQuestion];
    const selectedAnswer = answers[question.id];

    const progress =
        ((currentQuestion + 1) / quizQuestions.length) * 100;

    const handleOptionSelect = (option: string) => {
        setAnswers((previous) => ({
            ...previous,
            [question.id]: option,
        }));

        setError("");
    };

    const handlePrevious = () => {
        setError("");

        if (currentQuestion > 0) {
            setCurrentQuestion((previous) => previous - 1);
        }
    };

    const handleNext = () => {
        if (!selectedAnswer) {
            setError("Please select an answer before continuing.");
            return;
        }

        setError("");

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion((previous) => previous + 1);
        }
    };

    const handleSubmit = () => {
        const unansweredIndex = quizQuestions.findIndex(
            (item) => !answers[item.id]
        );

        if (unansweredIndex !== -1) {
            setCurrentQuestion(unansweredIndex);
            setError(
                `Please answer question ${unansweredIndex + 1} before submitting.`
            );
            return;
        }

        setError("");
        setSubmitted(true);
    };

    const calculateScore = () => {
        return quizQuestions.reduce((score, item) => {
            return score + (answers[item.id] === item.correctAnswer ? 1 : 0);
        }, 0);
    };

    const handleRetake = () => {
        setAnswers({});
        setCurrentQuestion(0);
        setError("");
        setSubmitted(false);
    };

    return (
        <>
            <Helmet>
                <title>Quiz - AI Career Navigator</title>
                <meta
                    name="description"
                    content="Test your career and technology knowledge."
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                {/* Existing dashboard navbar */}
                <DashboardNavbar />

                {/* Existing dashboard sidebar */}
                <DashboardSidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />

                {/* Dashboard content area */}
                <main
                    className={`ml-0 ${isCollapsed ? "lg:ml-[100px]" : "lg:ml-[280px]"
                        } transition-all duration-300 pt-24 pb-12`}
                >
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        {/* Page Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.2,
                                        type: "spring",
                                    }}
                                    className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center"
                                >
                                    <ClipboardCheck className="w-6 h-6 text-primary-foreground" />
                                </motion.div>

                                <div>
                                    <p className="text-sm font-medium text-secondary">
                                        Career Assessment
                                    </p>

                                    <h1 className="text-3xl md:text-4xl font-bold text-primary">
                                        Career Knowledge Quiz
                                    </h1>
                                </div>
                            </div>

                            <p className="text-muted-foreground max-w-2xl">
                                Test your knowledge and strengthen your understanding of
                                technology and career-related concepts.
                            </p>
                        </motion.div>

                        {!submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="max-w-4xl mx-auto"
                            >
                                {/* Progress Card */}
                                <div className="glass-card p-5 mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-primary">
                                            Question {currentQuestion + 1} of{" "}
                                            {quizQuestions.length}
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
                                        aria-valuemax={quizQuestions.length}
                                        aria-label={`Question ${currentQuestion + 1
                                            } of ${quizQuestions.length}`}
                                    >
                                        <motion.div
                                            className="h-full bg-secondary rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>

                                {/* Question Card */}
                                <motion.div
                                    key={question.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="glass-card p-6 md:p-8"
                                >
                                    <fieldset>
                                        <legend className="text-xl md:text-2xl font-semibold text-primary leading-relaxed mb-7">
                                            {question.question}
                                        </legend>

                                        <div className="space-y-3">
                                            {question.options.map((option, index) => {
                                                const isSelected = selectedAnswer === option;

                                                return (
                                                   <label
  key={option}
  className={`group flex items-center gap-4 p-4 md:p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
    isSelected
      ? "border-secondary bg-secondary/10 shadow-sm"
      : "border-border hover:border-secondary/50 hover:bg-muted/30"
  } focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2`}
>
                                                    
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.id}`}
                                                            value={option}
                                                            checked={isSelected}
                                                            onChange={() =>
                                                                handleOptionSelect(option)
                                                            }
                                                            className="sr-only"
                                                        />

                                                        {/* Visible focus/selection indicator */}
                                                        <span
                                                            aria-hidden="true"
                                                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-all ${isSelected
                                                                    ? "bg-secondary text-white border-secondary"
                                                                    : "border-border text-muted-foreground group-hover:border-secondary/60"
                                                                }`}
                                                        >
                                                            {String.fromCharCode(65 + index)}
                                                        </span>

                                                        <span className="text-primary font-medium">
                                                            {option}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </fieldset>

                                    {/* Accessible live region */}
                                    <div
                                        role="alert"
                                        aria-live="polite"
                                        aria-atomic="true"
                                        className="min-h-[24px] mt-5 text-sm text-destructive"
                                    >
                                        {error}
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5">
                                        <button
                                            type="button"
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-primary font-medium transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </button>

                                        {currentQuestion === quizQuestions.length - 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            >
                                                Submit Quiz
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ) : (
                            /* Result */
                            /* Result */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-4xl mx-auto"
                            >
                                {/* Score Summary */}
                                <div className="glass-card p-8 md:p-10 text-center mb-6">
                                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                                        <Sparkles className="w-8 h-8 text-primary-foreground" />
                                    </div>

                                    <h2 className="text-3xl font-bold text-primary mb-3">
                                        Quiz Completed!
                                    </h2>

                                    <p className="text-muted-foreground mb-7">
                                        Great work, {userProfile.name}. Here is your result.
                                    </p>

                                    <div className="mb-8">
                                        <div className="text-5xl font-bold text-primary">
                                            {calculateScore()}/{quizQuestions.length}
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-2">
                                            {Math.round(
                                                (calculateScore() / quizQuestions.length) * 100
                                            )}
                                            % Score
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleRetake}
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Retake Quiz
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/dashboard")}
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-primary font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            Back to Dashboard
                                        </button>
                                    </div>
                                </div>

                                {/* Question Review */}
                                <div className="glass-card p-6 md:p-8">
                                    <h3 className="text-xl font-semibold text-primary mb-6">
                                        Review Your Answers
                                    </h3>

                                    <div className="space-y-5">
                                        {quizQuestions.map((item, index) => {
                                            const userAnswer = answers[item.id];
                                            const isCorrect = userAnswer === item.correctAnswer;

                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`rounded-xl border p-5 ${isCorrect
                                                            ? "border-secondary/40 bg-secondary/5"
                                                            : "border-destructive/30 bg-destructive/5"
                                                        }`}
                                                >
                                                    {/* Question heading */}
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${isCorrect
                                                                    ? "bg-secondary text-white"
                                                                    : "bg-destructive text-white"
                                                                }`}
                                                        >
                                                            {index + 1}
                                                        </div>

                                                        <div className="flex-1">
                                                            <p className="font-semibold text-primary leading-relaxed">
                                                                {item.question}
                                                            </p>
                                                        </div>

                                                        <span
                                                            className={`text-sm font-semibold flex-shrink-0 ${isCorrect
                                                                    ? "text-secondary"
                                                                    : "text-destructive"
                                                                }`}
                                                        >
                                                            {isCorrect ? "Correct" : "Incorrect"}
                                                        </span>
                                                    </div>

                                                    {/* User answer */}
                                                    <div className="ml-11 space-y-2">
                                                        <div>
                                                            <span className="text-sm text-muted-foreground">
                                                                Your answer:
                                                            </span>

                                                            <p
                                                                className={`font-medium ${isCorrect
                                                                        ? "text-secondary"
                                                                        : "text-destructive"
                                                                    }`}
                                                            >
                                                                {userAnswer}
                                                            </p>
                                                        </div>

                                                        {/* Correct answer only for wrong questions */}
                                                        {!isCorrect && (
                                                            <div>
                                                                <span className="text-sm text-muted-foreground">
                                                                    Correct answer:
                                                                </span>

                                                                <p className="font-medium text-secondary">
                                                                    {item.correctAnswer}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Quiz;