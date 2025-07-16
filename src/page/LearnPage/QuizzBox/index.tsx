// src/features/learn/QuizBox.tsx
import { useQuizStore } from "@/strore/QuizzStore";
import { useEffect, useState } from "react";
import "./QuizzBox.scss";

interface QuizBoxProps {
    lessonId: number;
}

const QuizBox = ({ lessonId }: QuizBoxProps) => {
    const {
        quizzes,
        results,
        score,
        fetchQuizzes,
        submitAnswers,
        clearResults,
    } = useQuizStore();

    const [answers, setAnswers] = useState<{
        [key: number]: string | string[];
    }>({});

    useEffect(() => {
        fetchQuizzes(lessonId);
        clearResults();
        setAnswers({});
    }, [lessonId]);

    const handleChange = (quizId: number, value: string | string[]) => {
        setAnswers((prev) => ({ ...prev, [quizId]: value }));
    };

    const handleSubmit = () => {
        const answerList = Object.entries(answers).map(([quizId, answer]) => ({
            quizId: Number(quizId),
            answer,
        }));
        submitAnswers(lessonId, answerList);
    };

    return (
        <div className="quiz-box">
            <h3>Bài kiểm tra</h3>

            {quizzes.length === 0 && <p>Chưa có câu hỏi nào</p>}

            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-item">
                    <p>
                        <strong>{quiz.question}</strong>
                    </p>

                    {quiz.type === "FILL" && (
                        <input
                            type="text"
                            value={(answers[quiz.id] as string) || ""}
                            onChange={(e) =>
                                handleChange(quiz.id, e.target.value)
                            }
                        />
                    )}

                    {quiz.type === "SINGLE_CHOICE" &&
                        quiz.options?.map((opt) => (
                            <label key={opt}>
                                <input
                                    type="radio"
                                    name={`quiz-${quiz.id}`}
                                    value={opt}
                                    checked={answers[quiz.id] === opt}
                                    onChange={(e) =>
                                        handleChange(quiz.id, e.target.value)
                                    }
                                />
                                {opt}
                            </label>
                        ))}

                    {quiz.type === "MULTI_CHOICE" &&
                        quiz.options?.map((opt) => {
                            const selected = Array.isArray(answers[quiz.id])
                                ? (answers[quiz.id] as string[]).includes(opt)
                                : false;
                            return (
                                <label key={opt}>
                                    <input
                                        type="checkbox"
                                        value={opt}
                                        checked={selected}
                                        onChange={(e) => {
                                            const prev = Array.isArray(
                                                answers[quiz.id]
                                            )
                                                ? [
                                                      ...(answers[
                                                          quiz.id
                                                      ] as string[]),
                                                  ]
                                                : [];
                                            if (e.target.checked) {
                                                handleChange(quiz.id, [
                                                    ...prev,
                                                    opt,
                                                ]);
                                            } else {
                                                handleChange(
                                                    quiz.id,
                                                    prev.filter(
                                                        (o) => o !== opt
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    {opt}
                                </label>
                            );
                        })}

                    {results && results.find((r) => r.quizId === quiz.id) && (
                        <p>
                            Kết quả:{" "}
                            {results.find((r) => r.quizId === quiz.id)?.correct
                                ? "Đúng"
                                : "Sai"}
                        </p>
                    )}
                </div>
            ))}

            {quizzes.length > 0 && !results && (
                <button onClick={handleSubmit}>Nộp bài</button>
            )}

            {results && (
                <div>
                    <p>Điểm số: ({score})</p>
                    <button
                        onClick={() => {
                            clearResults();
                            setAnswers({});
                        }}
                    >
                        Làm lại
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizBox;
