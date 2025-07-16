// src/page/search/SearchResult.tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCourseStore } from "@/strore/CourseStore";
import CourseCard from "@/components/CourseCard/CourseCard";
import styles from "./SearchResult.module.scss";

const SearchResult = () => {
    const { courses, fetchCourses } = useCourseStore();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("q") || "";

    useEffect(() => {
        fetchCourses({ search: keyword });
    }, [keyword]);

    return (
        <div className={styles.wrapper}>
            {keyword && (
                <h2 className={styles.title}>Kết quả cho: "{keyword}"</h2>
            )}
            <div className={styles.grid}>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className={styles.empty}>Không tìm thấy khóa học nào</p>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
