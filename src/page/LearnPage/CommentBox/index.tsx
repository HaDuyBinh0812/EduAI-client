import { useEffect, useState } from "react";
import { useCommentStore } from "@/strore/CommentStore";

import { format } from "date-fns";
import "./CommentBox.scss";
import { useAuthStore } from "@/features/auth/stores/authStore";

interface CommentBoxProps {
    lessonId: number;
}

const CommentBox = ({ lessonId }: CommentBoxProps) => {
    const {
        comments,
        fetchComments,
        addComment,
        deleteComment,
        clearComments,
    } = useCommentStore();
    const { user } = useAuthStore();
    const [content, setContent] = useState("");

    useEffect(() => {
        if (lessonId) fetchComments(lessonId);
        return () => clearComments();
    }, [lessonId]);

    const handleSubmit = async () => {
        if (!content.trim()) return;
        await addComment(lessonId, content);
        setContent("");
    };

    const handleDelete = async (commentId: number) => {
        await deleteComment(commentId);
    };

    return (
        <div className="comment-box">
            <h3>Bình luận</h3>

            <div className="comment-box__input">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập bình luận..."
                />
                <button onClick={handleSubmit}>Gửi</button>
            </div>

            <div className="comment-box__list">
                {comments.length === 0 && <p>Chưa có bình luận nào.</p>}

                {comments.map((c) => (
                    <div key={c.id} className="comment-box__item">
                        <div>
                            <strong>{c.user.name}</strong>{" "}
                            <span className="comment-date">
                                {format(
                                    new Date(c.createdAt),
                                    "dd/MM/yyyy HH:mm"
                                )}
                            </span>
                        </div>
                        <p>{c.content}</p>
                        {String(user?.id) === String(c.user.id) && (
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="delete-btn"
                            >
                                Xoá
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentBox;
