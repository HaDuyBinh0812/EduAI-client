import { useEffect } from "react";

import CourseCard from "@/components/CourseCard/CourseCard";
import styles from "./Home.module.scss";
import { useCourseStore } from "@/strore/CourseStore";

const Home = () => {
    const { courses, fetchCourses } = useCourseStore();

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default Home;
