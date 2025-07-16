import styles from "./CourseCard.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import type { Course } from "@/strore/CourseStore";
import { Link } from "react-router-dom";

interface CourseCardProps {
    course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <Link to={`/courses/${course.slug}`} className={styles.card}>
            <div className={styles.thumbnailWrapper}>
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={styles.thumbnail}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{course.title}</h3>
                <span className={styles.free}>Miễn phí</span>
                <div className={styles.info}>
                    <span>
                        <FaUserFriends /> {course.totalLessons * 5000}
                    </span>
                    <span>
                        <AiOutlinePlayCircle /> {course.totalLessons}
                    </span>
                    <span>
                        <BiTimeFive /> {course.totalDuration}p
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
