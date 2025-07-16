import { useCourseStore } from "@/strore/CourseStore";
import { useEnrollmentStore } from "@/strore/EnrollmentStore";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseIntroPage.scss";

const CourseIntroPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { fetchCourseDetail, courseDetail } = useCourseStore();
    const { isEnrolled, checkEnrollment, enrollCourse } = useEnrollmentStore();

    const didRedirect = useRef(false);

    useEffect(() => {
        if (slug) fetchCourseDetail(slug);
    }, [slug]);

    useEffect(() => {
        if (courseDetail?.id) checkEnrollment(courseDetail.id);
    }, [courseDetail?.id]);

    useEffect(() => {
        if (isEnrolled && !didRedirect.current) {
            didRedirect.current = true;
            navigate(`/courses/${slug}/learn`);
        }
    }, [isEnrolled, slug]);

    const handleEnroll = async () => {
        if (!courseDetail?.id) return;
        await enrollCourse(courseDetail.id);
        await checkEnrollment(courseDetail.id);
    };

    const formatDuration = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} giờ ${minutes} phút`;
    };

    if (!courseDetail) return <div>Loading...</div>;

    return (
        <div className="course-intro">
            <div className="course-intro__container">
                <div className="course-intro__info">
                    <h1 className="course-intro__title">
                        {courseDetail.title}
                    </h1>
                    <p className="course-intro__desc">
                        {courseDetail.description}
                    </p>

                    <div className="course-intro__section">
                        <h3> Bạn sẽ học được gì?</h3>
                        <ul className="course-intro__list">
                            {courseDetail.youWillLearn.map((item, index) => (
                                <li key={index}>✔ {item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="course-intro__section">
                        <h3>Yêu cầu</h3>
                        <ul className="course-intro__list">
                            {courseDetail.requirements.map((item, index) => (
                                <li key={index}>✔ {item}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="course-intro__button"
                        onClick={handleEnroll}
                    >
                        Đăng ký học ngay
                    </button>
                </div>

                <div className="course-intro__thumbnail">
                    <img
                        src={courseDetail.thumbnail}
                        alt={courseDetail.title}
                    />

                    <div className="course-intro__meta">
                        <p>Trình độ cơ bản</p>
                        <p>Tổng số {courseDetail.totalLessons} bài học</p>
                        <p>
                            Thời lượng{" "}
                            {formatDuration(courseDetail.totalDuration)}
                        </p>
                        <p>Học mọi lúc, mọi nơi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseIntroPage;
