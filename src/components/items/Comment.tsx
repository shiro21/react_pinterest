import styles from "../../styles/comment.module.scss";
import { useSelector } from "react-redux";
import { ReducerProps } from "../../ts/reducer";
import { PinsProps } from "./CardWrap";
import React, { useEffect, useState } from "react";
import { api } from "../../ts/api";

interface CommentsProps {
    _id: string,
    createdAt: string,
    updatedAt: string,
    _uid: string,
    email: string,
    article: string,
    comment: string
}

export const Comment = ({ pin }: { pin: PinsProps }) => {

    // 내 정보
    const auth = useSelector((state: ReducerProps) => (state.reducer));

    // 댓글 불러오기
    const [commentData, setCommentData] = useState<CommentsProps[]>([]);
    useEffect(() => {
        api.post("/comment/read", {id: pin._id})
        .then(res => {
            if (res.data.code === "y") setCommentData(res.data.data);
        })
        .catch(err => console.log("Read Err", err));
    }, [pin._id]);

    // 댓글
    const [comment, setComment] = useState<string>("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;

        setComment(value);
    }
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;

        if (key === "Enter") {
            let data = {
                _uid: auth._id,
                article_id: pin._id,
                email: auth.email,
                comment: comment
            }
            api.post("/comment/create", data)
            .then(res => {
                if (res.data.code === "y") {
                    setCommentData(res.data.data);
                    setComment("");
                }
            })
            .catch(err => console.log("댓글 생성 에러", err));
        }
    }

    return (
        <article id={styles.comment_wrap}>
            <div className={styles.comment_wrap}>
                <ul>
                    {
                        commentData.length > 0 && commentData.map((item, index) => (
                            <li key={index}>
                                <div className={styles.comments_profile}>
                                    <div className={styles.profile}>
                                        <title>{item.email.split("@")[0]}</title>
                                        <span>{item.email.split("@")[0].charAt(0).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className={styles.comments_contetns}>
                                    <span>{item.email.split("@")[0]}</span>
                                    {item.comment}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className={styles.comment_input_wrap}>
                <div className={styles.profile}>
                    <title>{auth.email.split("@")[0]}</title>
                    <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
                </div>
                <input type="text" onChange={onChange} value={comment} onKeyPress={onKeyPress} placeholder="댓글 추가" />
            </div>
        </article>
    );
};