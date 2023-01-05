import styles from "../../styles/pin.module.scss";
import { PinsProps } from "../items/CardWrap";

// ts
import { baseUrl } from "../../ts/url";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "../items/Comment";
import { UserProps } from "../../ts/reducer";
import { api } from "../../ts/api";
import axios from "axios";

export const PinContents = ({ pin, auth }: { pin: PinsProps, auth: UserProps}) => {
    
    const onDownload = useCallback(() => {
        axios({
            url: "http://localhost:4000/" + pin.image,
            method: "GET",
            responseType: "blob"
        })
        .then(res => {
            console.log(res);
            const blob = new Blob([res.data]);

            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = pin.image;
            

            link.click();
            link.remove();

            URL.revokeObjectURL(fileUrl);
        })
        .catch(err => console.log("Download Err", err));
    }, [pin]);


    // 작성자 일 경우 아닐경우
    const [writer, setWriter] = useState<boolean>(false);
    const [listOpen, setListOpen] = useState<boolean>(false);
    useEffect(() => {
        if (auth._id === pin._uid) setWriter(true);
        else setWriter(false);
    }, [writer, auth._id, pin._uid]);

    const onList = () => {
        if (listOpen) setListOpen(false);
        else setListOpen(true);
    }

    const [save, setSave] = useState<boolean>(false);
    useEffect(() => {
        let data = {
            _uid: auth._id,
            article_id: pin._id
        }
        api.post("/edit/saveConfirm", data)
        .then(res => {
            if (res.data.data.length > 0) setSave(true);
        })
        .catch(err => console.log("SaveConfirm Err", err));
    }, [auth._id, pin._id])
    const pinSave = () => {

        let data = {
            _uid: auth._id,
            article_id: pin._id
        }

        if (!save) {
            api.post("/edit/savePin", data)
            .then(res => {
                if (res.data.code === "y") setSave(true);
            })
            .catch(err => console.log("Edit Save Err", err));
        } else {
            api.post("/edit/canclePin", data)
            .then(res => {
                if (res.data.code === "y") setSave(false);
            })
            .catch(err => console.log("Edit delete Err", err));
        }
    }

    return (
        <article className={styles.pin_contents}>
            <div className={styles.pin_box_wrap}>
                <div className={styles.pin_box}>
                    <div className={styles.pin_image}>
                        <img src={baseUrl + pin.image} alt={pin.title} />
                        <span onClick={() => window.open(`${baseUrl + pin.image}`, '_blank')}>이미지 확대</span>
                    </div>
                    <div className={styles.pin_information}>
                        <div className={styles.pin_info_header}>
                            <div className={styles.pin_list_wrap}>
                                <div className={styles.items} onClick={onList}>
                                    <svg className="gUZ PLa U9O kVc" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path></svg>
                                </div>
                                {
                                    writer && listOpen && <ul className={styles.item_list}>
                                            <li>핀 수정</li>
                                            <li onClick={onDownload}>이미지 다운로드</li>
                                        </ul>
                                }
                                {
                                    !writer && listOpen && <ul className={styles.item_list}>
                                        <li onClick={onDownload}>이미지 다운로드</li>
                                    </ul>
                                }
                                {/* <div className={styles.items}>
                                    <svg className="gUZ R19 U9O kVc" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg>
                                </div>
                                <div className={styles.items}>
                                    <svg className="Hn_ gUZ R19 U9O kVc" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="m21 7.24-4.05 4.05-1.06-1.06.67-.67a1.5 1.5 0 1 0-2.12-2.12l-.67.67-1.06-1.06L16.76 3zm-9.7 9.7L7.23 21 3 16.76l4.05-4.05 1.06 1.06-.67.67a1.5 1.5 0 0 0 2.12 2.12l.67-.67zM14.63.89l-4.05 4.05a3 3 0 0 0 0 4.24l1.06 1.06-1.42 1.42-1.06-1.06a3 3 0 0 0-4.24 0L.88 14.64a3 3 0 0 0 0 4.24l4.24 4.24a3 3 0 0 0 4.24 0l4.05-4.05a3 3 0 0 0 0-4.24l-1.06-1.06 1.42-1.42 1.06 1.06a3 3 0 0 0 4.24 0l4.05-4.05a3 3 0 0 0 0-4.24L18.88.88a3 3 0 0 0-4.24 0z"></path></svg>
                                </div> */}
                            </div>
                            <div className={styles.pin_save_button_wrap}>
                                {
                                    !writer && (
                                        save ? <button className={styles.btn_color} onClick={pinSave}>저장됨</button> : <button onClick={pinSave}>저장</button>
                                    )
                                }
                            </div>
                        </div>

                        <div className={styles.pin_info_contents}>
                            <h2>{pin.title}</h2>
                            <p>{pin.text}</p>
                        </div>

                        <div className={styles.pin_comments_wrap}>
                            <h3>댓글</h3>
                            <Comment pin={pin} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}