import { useCourseStore } from "@/strore/CourseStore";
import { useEnrollmentStore } from "@/strore/EnrollmentStore";
import { useSectionStore } from "@/strore/SectionStore";
import { useProgressStore } from "@/strore/ProgressStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCompactDisc, FaCheckCircle } from "react-icons/fa";

import "./LearnPage.scss";
import CommentBox from "./CommentBox";
import QuizBox from "./QuizzBox";

const CourseLearnPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { fetchCourseDetail, courseDetail } = useCourseStore();
    const { isEnrolled, checkEnrollment } = useEnrollmentStore();
    const { fetchSections, sections } = useSectionStore();
    const { fetchProgress, fetchProgressSummary, progresses, updateProgress } =
        useProgressStore();

    const [currentLessonUrl, setCurrentLessonUrl] = useState<string | null>(
        null
    );
    const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [lastCompletedLessonId, setLastCompletedLessonId] = useState<
        number | null
    >(null);

    useEffect(() => {
        if (slug) fetchCourseDetail(slug);
    }, [slug]);

    useEffect(() => {
        if (courseDetail?.id) {
            checkEnrollment(courseDetail.id);
            fetchSections(courseDetail.id);
            fetchProgress(courseDetail.id);
            fetchProgressSummary(courseDetail.id);
        }
    }, [courseDetail?.id]);

    useEffect(() => {
        if (!isEnrolled && courseDetail) {
            navigate(`/courses/${slug}`);
        }
    }, [isEnrolled]);

    const isLessonCompleted = (lessonId: number) =>
        progresses.some((p) => p.lessonId === lessonId && p.percentage >= 0.8);

    const handleVideoEnded = () => {
        if (currentLessonId) {
            updateProgress(currentLessonId, 100);
            fetchProgress(courseDetail!.id);
            fetchProgressSummary(courseDetail!.id);
            setLastCompletedLessonId(currentLessonId);
            setTimeout(() => setLastCompletedLessonId(null), 1000);
        }
    };

    if (!courseDetail) return <div>Loading...</div>;

    return (
        <div className="course-learn">
            <div className="course-learn__main">
                <div className="course-learn__video">
                    {currentLessonUrl ? (
                        <video
                            key={currentLessonUrl}
                            src={currentLessonUrl}
                            controls
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={handleVideoEnded}
                        />
                    ) : (
                        <div className="course-learn__placeholder">
                            Chọn bài học để bắt đầu học!
                        </div>
                    )}
                </div>

                {currentLessonId && (
                    <div className="course-learn__extras">
                        <QuizBox lessonId={currentLessonId} />
                        <CommentBox lessonId={currentLessonId} />
                    </div>
                )}
            </div>

            <div className="course-learn__sidebar">
                <h2>{courseDetail.title}</h2>

                {sections.map((section) => (
                    <div key={section.id} className="course-learn__section">
                        <h3>{section.title}</h3>
                        <ul className="course-learn-items">
                            {section.lessons.map((lesson) => (
                                <li
                                    key={lesson.id}
                                    onClick={() => {
                                        setCurrentLessonUrl(lesson.contentUrl);
                                        setCurrentLessonId(lesson.id);
                                    }}
                                    className={`course-learn-info ${
                                        currentLessonUrl === lesson.contentUrl
                                            ? "active"
                                            : ""
                                    } ${
                                        isLessonCompleted(lesson.id)
                                            ? "completed"
                                            : ""
                                    } ${
                                        lastCompletedLessonId === lesson.id
                                            ? "glow-once"
                                            : ""
                                    }`}
                                >
                                    <p>{lesson.title}</p>
                                    <p className="course-learn-duration">
                                        {isLessonCompleted(lesson.id) ? (
                                            <FaCheckCircle className="icon-complete" />
                                        ) : (
                                            <FaCompactDisc
                                                className={`icon-disc ${
                                                    currentLessonUrl ===
                                                        lesson.contentUrl &&
                                                    isPlaying
                                                        ? "spinning"
                                                        : ""
                                                }`}
                                            />
                                        )}{" "}
                                        ({lesson.duration}:00)
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseLearnPage;
